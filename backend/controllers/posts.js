const postsRouter = require('express').Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const Post = require('../models/Post');
const Order = require('../models/Order');
const config = require('../utils/config');

postsRouter.post('/order', async (request, response) => {
  const order = new Order({
    name: 'posts',
  });
  await order.save();
  response.status(201).json(order);
});

postsRouter.get('/', async (request, response) => {
  const posts = await Order.findOne({ name: 'posts' }).populate('order', {
    image: 1,
    title: 1,
    project: 1,
  });
  response.json(posts.order);
});

postsRouter.get('/edit', async (request, response) => {
  const posts = await Order.findOne({ name: 'posts' }).populate('order', {
    image: 1,
    title: 1,
    project: 1,
  });
  response.json(posts.order);
});

postsRouter.post('/', upload.array('file', 10), async (request, response) => {
  if (request.user === config.ADMIN_ID) {
    const files = request.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const results = await Promise.all(files);
    const posts = results.map(
      (result, index) =>
        new Post({
          title: `${request.body.title}-${index + 1}`,
          image: result.secure_url,
          project: request.body.project,
          cloudinaryId: result.public_id,
          createdAt: new Date(),
        })
    );
    const postsToBeSaved = posts.map((post) => post.save());
    const savedPosts = await Promise.all(postsToBeSaved);
    const postsOrder = await Order.findOne({ name: 'posts' });
    postsOrder.order.push(...savedPosts);
    await postsOrder.save();
    response.status(201).json(savedPosts);
  } else {
    response.status(401).json({ error: 'unauthorized user' });
  }
});

postsRouter.put('/', async (request, response) => {
  if (request.user === config.ADMIN_ID) {
    const updatedOrder = request.body;
    const ids = request.body.map((b) => b.id);
    const postsOrder = await Order.findOne({ name: 'posts' });
    postsOrder.order = ids;
    await postsOrder.save();
    response.status(200).json(updatedOrder);
  } else {
    response.status(401).json({ error: 'unauthorized user' });
  }
});

postsRouter.delete('/:id', async (request, response) => {
  if (request.user === config.ADMIN_ID) {
    const post = await Post.findByIdAndRemove(request.params.id);
    await cloudinary.uploader.destroy(post.cloudinaryId);
    const postsOrder = await Order.findOne({ name: 'posts' });
    const newOrder = postsOrder.order.filter(
      (p) => p.toString() !== request.params.id
    );
    console.log(newOrder);
    postsOrder.order = newOrder;
    await postsOrder.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'unauthorized user' });
  }
});

module.exports = postsRouter;

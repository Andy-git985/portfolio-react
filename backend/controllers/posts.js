const postsRouter = require('express').Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const Post = require('../models/Post');
const Order = require('../models/Order');

postsRouter.get('/', async (request, response) => {
  const posts = await Order.findOne({ name: 'posts' }).populate('order', {
    image: 1,
  });
  response.json(posts.order);
});

postsRouter.get('/edit', async (request, response) => {
  const posts = await Order.findOne({ name: 'posts' }).populate('order', {
    image: 1,
    title: 1,
  });
  response.json(posts.order);
});

postsRouter.post('/', upload.single('file'), async (request, response) => {
  const result = await cloudinary.uploader.upload(request.file.path);
  const post = new Post({
    title: request.body.title,
    image: result.secure_url,
    project: request.body.project,
    cloudinaryId: result.public_id,
    createdAt: new Date(),
  });
  const savedPost = await post.save();
  const postsOrder = await Order.findOne({ name: 'posts' });
  postsOrder.order.push(savedPost);
  await postsOrder.save();
  response.status(201).json(savedPost);
});

postsRouter.put('/edit', async (request, response) => {
  const body = request.body;
  const postsOrder = await Order.findOne({ name: 'posts' });
  postsOrder.order = body.order;
  await postsOrder.save();
  response.status(202).json(postsOrder.order);
});

postsRouter.delete('/:id', async (request, response) => {
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
});

module.exports = postsRouter;

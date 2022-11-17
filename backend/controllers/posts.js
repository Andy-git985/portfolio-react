const postsRouter = require('express').Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const Post = require('../models/Post');

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  response.json(posts);
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
  response.status(201).json(savedPost);
});

postsRouter.delete('/:id', async (request, response) => {
  const post = await Post.findByIdAndRemove(request.params.id);
  await cloudinary.uploader.destroy(post.cloudinaryId);
  response.status(204).end();
});

module.exports = postsRouter;

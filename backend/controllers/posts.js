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
    cloudinaryId: result.public_id,
    createdAt: new Date(),
  });
  const savedPost = await post.save();
  response.status(201).json(savedPost);
});

module.exports = postsRouter;

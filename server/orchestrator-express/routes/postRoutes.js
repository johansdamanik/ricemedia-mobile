const router = require('express').Router();
const axios = require('axios');
const redis = require('../config/redisConnection');

const SERVER_USER_URL = 'http://localhost:4001';
const SERVER_APP_URL = 'http://localhost:4002';

// GET POSTS
router.get('/', async (req, res) => {
  try {
    const postsCache = await redis.get('posts');

    if (postsCache) {
      const posts = JSON.parse(postsCache);
      res.status(200).json(posts);
    } else {
      const { data: posts } = await axios.get(SERVER_APP_URL + '/posts');

      const userRequests = posts.map(async (post) => {
        const { data: user } = await axios.get(SERVER_USER_URL + `/users/${post.userMongoId}`);
        post.User = user;
      });

      await Promise.all(userRequests);

      await redis.set('posts', JSON.stringify(posts));
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
  try {
    const { data: post } = await axios.get(SERVER_APP_URL + '/posts/' + req.params.id);
    const { data: user } = await axios.get(SERVER_USER_URL + `/users/${post.userMongoId}`);

    post.User = user;

    res.status(200).json(post);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// CREATE POST
router.post('/', async (req, res) => {
  try {
    const { data } = await axios.post(SERVER_APP_URL + '/posts', req.body);

    await redis.del('posts');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.put(SERVER_APP_URL + '/posts/' + id, req.body);

    await redis.del('posts');
    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE POST BY ID
router.delete('/:id', async (req, res) => {
  try {
    const { data } = await axios.delete(SERVER_APP_URL + '/posts/' + req.params.id);

    await redis.del('posts');
    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;

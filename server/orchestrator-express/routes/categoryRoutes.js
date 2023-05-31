const router = require('express').Router();
const axios = require('axios');
const redis = require('../config/redisConnection');

const SERVER_USER_URL = 'http://localhost:4001';
const SERVER_APP_URL = 'http://localhost:4002';

// GET CATEGORIES
router.get('/', async (req, res) => {
  try {
    const categoriesCache = await redis.get('categories');

    if (categoriesCache) {
      const categories = JSON.parse(categoriesCache);

      res.status(200).json(categories);
    } else {
      const { data } = await axios.get(SERVER_APP_URL + '/categories');

      await redis.set('categories', JSON.stringify(data));
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE CATEGORY
router.post('/', async (req, res) => {
  try {
    const { data } = await axios.post(SERVER_APP_URL + '/categories', req.body);

    await redis.del('categories');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// UPDATE CATEGORY
router.put('/:id', async (req, res) => {
  try {
    const { data } = await axios.put(SERVER_APP_URL + '/categories/' + req.params.id, req.body);

    await redis.del('categories');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE CATEGORY BY ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const { data } = await axios.delete(SERVER_APP_URL + '/categories/' + req.params.id);

    await redis.del('categories');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;

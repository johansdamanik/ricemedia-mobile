const router = require('express').Router();
const axios = require('axios');
const redis = require('../config/redisConnection');

const SERVER_USER_URL = 'http://localhost:4001';


// GET USERS
router.get('/', async (req, res) => {
  try {
    const usersCache = await redis.get('users');

    if (usersCache) {
      const users = JSON.parse(usersCache);
      res.status(200).json(users);
    } else {
      const { data } = await axios.get(SERVER_USER_URL + '/users');

      await redis.set('users', JSON.stringify(data));
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE USERS
router.post('/', async (req, res) => {
  try {
    const { data } = await axios.post(SERVER_USER_URL + '/users', req.body);

    await redis.del('users');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data });
  }
});


// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const { data } = await axios.get(SERVER_USER_URL + '/users/' + req.params.id);

    await redis.del('users');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});


// DELETE USER BY ID
router.delete('/:id', async (req, res) => {
  try {
    const { data } = await axios.delete(SERVER_USER_URL + '/users/' + req.params.id);

    await redis.del('users');
    res.status(201).json(data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;

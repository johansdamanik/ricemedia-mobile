const User = require('../models/User');

class UserController {
  static async findAll(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  static async newUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: '!email' };
      if (!password) throw { name: '!password' };

      const user = await User.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      switch (error.name) {
        case '!email':
          return res.status(400).json('Email is required');
        case '!password':
          return res.status(400).json('Password is required');
        default:
          return res.status(500).json(error);
      }
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.deleteUser(id);

      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = UserController;

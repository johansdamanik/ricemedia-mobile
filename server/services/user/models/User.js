const { getDb } = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

class User {
  static collection() {
    return getDb().collection('users');
  }

  static async findAll() {
    const users = await this.collection().find().project({ password: 0 }).toArray();
    return users;
  }
  static async findById(id) {
    const user = await this.collection().findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    return user;
  }

  static async createUser(data) {
    const user = await this.collection().insertOne(data);
    return user;
  }

  static async deleteUser(id) {
    const user = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return user;
  }
}

module.exports = User;

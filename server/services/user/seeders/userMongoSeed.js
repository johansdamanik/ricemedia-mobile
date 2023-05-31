const { getDb, connect } = require('../config/mongoConnection');
const { hashPassword } = require('../helpers/bcrypt');

async function seedUsers() {
  await connect();

  const usersCollection = getDb().collection('users');

  const initialUsers = [
    {
      username: 'admin',
      email: 'admin@mail.com',
      password: hashPassword('12345'),
      role: 'admin',
      phoneNumber: '123456789',
      address: 'Jl. Meranti No. 1',
    },
    {
      username: 'user',
      email: 'user@mail.com',
      password: hashPassword('12345'),
      role: 'user',
      phoneNumber: '987654321',
      address: 'Jl. Meranti No. 2',
    },
  ];

  try {
    await usersCollection.insertMany(initialUsers);
    console.log('Data seeded successfully.');
  } catch (error) {
    console.log(error);
  }
}

seedUsers();

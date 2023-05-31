'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db.json').posts;

    data.forEach((el) => {
      el.userMongoId = '6475b5eedc2d17fb57c8f972'
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Posts', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null);
  },
};

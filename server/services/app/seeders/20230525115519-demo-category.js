'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db.json').categories;

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Categories', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null);
  },
};

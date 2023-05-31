'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db.json').tags;

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Tags', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null);
  },
};

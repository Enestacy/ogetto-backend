"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "interests",);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "interests", {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'tags' },
        key: "id"
      },
    });
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "tag", {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'tags' },
        key: "id"
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tasks", "tag");
  },
};


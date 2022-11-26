"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "category", {
      type: Sequelize.ENUM(["quite", "social-party", "online-activity"])
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tasks", "category");
  },
};

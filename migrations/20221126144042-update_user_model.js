"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "tg", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("users", "status", {
      type: Sequelize.ENUM(["no-active", "active"])
    });
    await queryInterface.addColumn("users", "date_of_birth", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("users", "grade", {
      type: Sequelize.ENUM(["Миддл", "Джуниор", "Синьор", "N/A"])
    });
    await queryInterface.addColumn("users", "current_project", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("users", "surname", {
      type: Sequelize.STRING
    });
    User.sync()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "tg");
    await queryInterface.removeColumn("users", "status");
    await queryInterface.removeColumn("users", "date_of_birth");
    await queryInterface.removeColumn("users", "grade");
    await queryInterface.removeColumn("users", "current_project");
    await queryInterface.removeColumn("users", "surname");
  },
};


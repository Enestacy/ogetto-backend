"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_tasks",
      {
        TaskId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: { tableName: "tasks" },
            key: "id",
          },
        },
        UserId: {
          type: Sequelize.UUID,
          primaryKey: true,
          onDelete: 'CASCADE',
          references: {
            model: { tableName: "users" },
            key: "id",
          },
        },
        isDone: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_tasks");
  },
};

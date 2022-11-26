"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user_tags",
      {
        TagId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: { tableName: "tags" },
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
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_tags");
  },
};

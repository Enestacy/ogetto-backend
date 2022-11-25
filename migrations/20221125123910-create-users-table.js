'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      position: {
        type: Sequelize.STRING
      },
      interests: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      }
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
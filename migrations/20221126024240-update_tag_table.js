/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tags", "title", {
      type: Sequelize.STRING,
      onDelete: "SETNULL",
      onUpdate: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tags", "title", {
      type: Sequelize.STRING,
    });
  },
};

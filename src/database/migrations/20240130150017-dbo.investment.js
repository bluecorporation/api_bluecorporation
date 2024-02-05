'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Investments', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        investment_value:{
          type:Sequelize.STRING,
          allowNull:false
        },

        user_id:{ 
          type:Sequelize.STRING,
          allowNull:false
        },
        createdAt: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.STRING,
          allowNull: false,
        }

      });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('services', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        // primaryKey: true,
        unique: true
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sellPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resellPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      speed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      min: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      panel: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'panels',
          key: 'name'
        }
      },
      refill: {
        type: Sequelize.BOOLEAN,
        allowNull: false,

      },
      droprate: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
     return await queryInterface.dropTable('services');
  }
};

'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cartdetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            cartId: {
                type: Sequelize.INTEGER
            },
            courseId: {
                type: Sequelize.INTEGER
            },
            NameCourse: {
                type: Sequelize.STRING
            },
            Total: {
                type: Sequelize.INTEGER
            },
            Detail: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cartdetails');
    }
};
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('roadmaps', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            semester: {
                type: Sequelize.INTEGER
            },
            credit: {
                type: Sequelize.STRING
            },
            prerequisite: {
                type: Sequelize.STRING
            },
            courseId: {
                type: Sequelize.INTEGER
            },
            scholasticId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('roadmaps');
    }
};
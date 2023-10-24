'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('courses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameCourse: {
                type: Sequelize.STRING
            },
            lecturers: {
                type: Sequelize.STRING
            },
            detail: {
                type: Sequelize.TEXT
            },
            describe: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            soldquantity: {
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
        await queryInterface.dropTable('courses');
    }
};
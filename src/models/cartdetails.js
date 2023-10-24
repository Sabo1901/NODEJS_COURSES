'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cartdetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Cartdetails.init({
        cartId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER,
        NameCourse: DataTypes.STRING,
        Total: DataTypes.INTEGER,
        Detail: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Cartdetails',
    });
    return Cartdetails;
};
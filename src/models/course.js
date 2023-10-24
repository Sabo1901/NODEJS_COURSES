'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.hasOne(models.Markdown, { foreignKey: 'courseId' })
        }
    };
    Course.init({
        nameCourse: DataTypes.STRING,
        lecturers: DataTypes.STRING,
        detail: DataTypes.TEXT,
        describe: DataTypes.TEXT,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        soldquantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};
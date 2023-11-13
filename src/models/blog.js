'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Blog.belongsTo(models.User, { foreignKey: 'userId' })
        }
    };
    Blog.init({
        title: DataTypes.STRING,
        detail: DataTypes.TEXT,
        image: DataTypes.STRING,
        date: DataTypes.DATE,
        userId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};
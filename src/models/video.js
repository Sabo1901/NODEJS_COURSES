'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Video.belongsTo(models.Course, { foreignKey: 'courseId' })
        }
    };
    Video.init({
        linkVideo: DataTypes.STRING,
        courseId: DataTypes.INTEGER,
        chapter: DataTypes.STRING,
        titleArticle: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Video',
    });
    return Video;
};
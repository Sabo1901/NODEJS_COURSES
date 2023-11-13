'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Roadmap extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Roadmap.belongsTo(models.Course, { foreignKey: 'courseId' }),
                Roadmap.belongsTo(models.Scholastic, { foreignKey: 'scholasticId' })
        }
    };
    Roadmap.init({
        semester: DataTypes.INTEGER,
        credit: DataTypes.INTEGER,
        prerequisite: DataTypes.STRING,
        courseId: DataTypes.INTEGER,
        scholasticId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Roadmap',
    });
    return Roadmap;
};
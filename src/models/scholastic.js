'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scholastic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Scholastic.hasMany(models.Roadmap, { foreignKey: 'scholasticId' }),
                Scholastic.hasMany(models.User, { foreignKey: 'scholasticId' })
        }
    };
    Scholastic.init({
        prerequisiteId: DataTypes.INTEGER,
        scholastic: DataTypes.STRING,
        diagram: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'Scholastic',
    });
    return Scholastic;
};
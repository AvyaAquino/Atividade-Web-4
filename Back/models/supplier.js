const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Supplier extends Model {}

Supplier.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'supplier'
    }
);


module.exports = Supplier;
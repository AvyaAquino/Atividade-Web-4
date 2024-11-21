const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Products extends Model {}

Products.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'products'
    }
);

module.exports = Products;
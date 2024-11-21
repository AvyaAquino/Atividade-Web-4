const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./products');
const Supplier = require('./supplier');

class Historico extends Model {}
Historico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'historico'
    }
);

Products.hasMany(Historico, { foreignKey: 'productId' });
Historico.belongsTo(Products, { foreignKey: 'productId' });
Supplier.hasMany(Historico, { foreignKey: 'supplierId' });
Historico.belongsTo(Supplier, { foreignKey: 'supplierId' });

module.exports = Historico;
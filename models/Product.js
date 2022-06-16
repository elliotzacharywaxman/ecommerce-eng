// import important parts of sequelize library
const { Model, DataTypes, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id:{
      type:DataTypes.INTEGER,
      references:{
        model: "category",
        key: "id"
      }
    },
    product_name: {
      type: DataTypes.String,
      allowNull:false,
    }
    price: {
      type:DataTypes.Decimal,
      allowNull: false,
      validate:{
        isDecimal: true,
      }
    }
    stock: {
      type:DataTypes.Integer,
      allowNull: false,
      // default: 10,
      validate:{
        isNumeric: true,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, 
});



const syncDatabase = async () => {
  try {
    await Product.sync({ alter: true }); 
    console.log('Tabela Product sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar tabela Product:', error);
  }
};


syncDatabase();

module.exports = { Product };

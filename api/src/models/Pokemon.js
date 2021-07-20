const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
     id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    }, 
    idd: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url:{
      type: DataTypes.STRING,
      allowNull: true
    },
    img:{
      type: DataTypes.STRING,
      allowNull: true
    },
    types:{
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};

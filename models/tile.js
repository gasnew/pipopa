var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Tile = sequelize.define('Tile', {
    x: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    y: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });

  return Tile;
};


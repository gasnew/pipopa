var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Tile = sequelize.define('Tile', {
    x: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Tile.associate = function(models) {
    Tile.hasOne(models.Item, {
      foreignKey: 'containerId',
      constraints: false,
      scope: {
        container: 'Tile'
      }
    });
  };

  return Tile;
};


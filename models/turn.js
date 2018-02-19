var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Turn = sequelize.define('Turn', {
  });

  Turn.associate = function(models) {
    Turn.belongsTo(models.Player);
    Turn.hasMany(models.Action);
  };

  return Turn;
};


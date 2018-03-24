module.exports = function(sequelize, DataTypes) {
  var Round = sequelize.define('Round', {
  });

  Round.associate = function(models) {
    Round.hasMany(models.Turn);
  };

  return Round;
};

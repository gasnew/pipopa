module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
  });

  return Player;
};


module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    x: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Player.protFuncs = function(models) {
    Player.prototype.getCurrentTurn = function() {
      return new Promise((resolve, reject) => {
        models.Turn.findOne({where: {PlayerId: this.id, status: 'running'}}).then(turn => {
          resolve(turn);
        });
      });
    };
  };

  Player.associate = function(models) {
    Player.hasMany(models.Turn);
    Player.belongsTo(models.User);
  };

  return Player;
};


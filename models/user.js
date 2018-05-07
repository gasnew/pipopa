module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.protFuncs = function(models) {
    User.prototype.getWaitingMessages = async function() {
      return await models.Message.all({
        where: {
          recipientId: this.id,
          status: 'waiting'
        }
      });
    };
  };

  User.associate = function(models) {
    User.hasMany(models.Message);
  };

  return User;
};


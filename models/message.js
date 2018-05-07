module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {as: 'sender'});
    Message.belongsTo(models.User, {as: 'recipient'});
  };

  Message.protFuncs = function(models) {
    Message.prototype.path = function() {
      return 'audio/' + this.id + '.wav';
    };
  };

  return Message;
};


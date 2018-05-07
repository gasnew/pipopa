module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {as: 'sender'});
    // Message.belongsTo(models.User);
    Message.belongsTo(models.User, {as: 'recipient'});
  };

  return Message;
};


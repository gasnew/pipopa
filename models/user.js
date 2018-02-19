var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

  });

  //User.hasOne(models.Player);

  return User;
};


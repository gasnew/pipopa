var models = require('../models');

module.exports = function(sequelize, DataTypes) {
  var Turn = sequelize.define('Turn', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Turn.associate = function(models) {
    Turn.belongsTo(models.Player);
    Turn.hasMany(models.Action);
  };

  Turn.classFuncs = function(models) {
  };

  Turn.protFuncs = function(models) {
    Turn.prototype.validateAction = function(action) {
      return new Promise((resolve, reject) => {
        if (action.type == 'move') {
          models.Action.create({
            type: action.type,
            content: {
              fromBlock: action.fromBlock,
              toBlock: action.toBlock,
            },
          })
          .then(a => this.addAction(a))
          .then(t => {
            resolve(this.toPostObj());
          });
        }
      });
    };

    Turn.prototype.toPostObj = function() {
      return new Promise((resolve, reject) => {
        this.getActions()
        .then(actions => {
          action_values = actions.map(a => a.dataValues);
          resolve(action_values);
        });
      });
    };
  };

  return Turn;
};


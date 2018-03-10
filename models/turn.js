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
    Turn.prototype.integrateAction = function(action) {
      return new Promise((resolve, reject) => {
        this.validateAction(action)
        .then(result => {
          models.Action.create(action)
          .then(a => this.addAction(a))
          .then(t => resolve(this.toPostObj()));
        })
        .catch(result => {
          reject("INVALID ACTION");
        });
      });
    };

    Turn.prototype.validateAction = function(a) {
      return new Promise((resolve, reject) => {
        this.simulateTurn()
        .then(result => {
          this.simulateAction(result, a)
          .then(r => resolve(r))
          .catch(e => reject(e));
        })
        .catch(result => {
          // GAME STATE CHANGED SINCE LAST ACTION
          reject(result);
        });
      });
    };

    Turn.prototype.simulateTurn = function() {
      var result = {
        state: {},
        error: null,
      };

      return new Promise((resolve, reject) => {
        resolve(result);
      });
    };

    Turn.prototype.simulateAction = function(result, a) {
      if (a.type == 'move') {
        return this.simulateMove(result, a);
      } else {
        throw new Error('No action of type' + a.type);
      }
    };

    Turn.prototype.simulateMove = function(result, m) {
      return new Promise((resolve, reject) => {
        resolve(result);
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


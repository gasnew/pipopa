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
      return new Promise(async (resolve, reject) => {
        try {
          await models.sequelize.transaction(async () => {
            await this.validateAction(action);
            await this.addAction(await models.Action.create(action));
            await this.applyAction(action);

            resolve(this.toPostObj());
          });
        } catch(e) {
          reject(e);
        }
      });
    };

    Turn.prototype.validateAction = function(a) {
      return new Promise(async (resolve, reject) => {
        try {
          var sResult = await this.simulate();
          try {
            var aResult = await this.simulateAction(sResult.state, a);
            resolve(aResult);
          } catch(e) {
            // INVALID ACTION
            reject(e);
          }
        } catch(e) {
          // GAME STATE CHANGED SINCE LAST ACTION
          reject(e);
        }
      });
    };

    Turn.prototype.simulate = function() {
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

    Turn.prototype.applyAction = async function(a) {
      if (a.type == 'move') {
        var player = await this.getPlayer();
        player.x = a.content.toTile.x;
        player.y = a.content.toTile.y;
        player.save();
      } else {
        throw new Error('No action of type' + a.type);
      }
    };

    Turn.prototype.toPostObj = function() {
      return new Promise((resolve, reject) => {
        this.getActions()
        .then(actions => {
          var action_values = actions.map(a => a.dataValues);
          resolve(action_values);
        });
      });
    };

    Turn.prototype.finish = function() {
      this.status = 'done';
      this.save();
    };
  };

  return Turn;
};


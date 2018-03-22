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
    Turn.prototype.integrateAction = async function(action) {
      await models.sequelize.transaction(async (t) => {
        await this.validateAction(action);
        var newA = await models.Action.create(action, {transaction: t});
        await this.addAction(newA, {transaction: t});
      });

      return await this.toPostObj();
    };

    Turn.prototype.validateAction = async function(a) {
      var sResult = await this.simulate();
      await this.simulateAction(sResult.state, a);
    };

    Turn.prototype.simulate = async function() {
      var result = {
        state: {},
        error: null,
      };

      return result;
    };

    Turn.prototype.simulateAction = async function(result, a) {
      if (a.type == 'move') {
        return await this.simulateMove(result, a);
      } else {
        throw new Error('No action of type' + a.type);
      }
    };

    Turn.prototype.simulateMove = async function(result, m) {
      return result;
    };

    Turn.prototype.perform = async function() {
      await this.simulate();

      var actions = await this.getActions();
      await models.sequelize.transaction(async (t) => {
        for (var a of actions) {
          await this.performAction(a, t);
        }
      });
    };

    Turn.prototype.performAction = async function(a, t) {
      if (a.type == 'move') {
        var player = await this.getPlayer({transaction: t});
        player.x = a.content.toTile.x;
        player.y = a.content.toTile.y;
        await player.save({transaction: t});
      } else {
        throw new Error('No action of type ' + a.type);
      }
    };

    Turn.prototype.toPostObj = async function() {
      var actions = await this.getActions();
      return actions.map(a => a.dataValues);
    };

    Turn.prototype.finish = async function() {
      await this.perform();
      this.status = 'done';
      await this.save();
    };
  };

  return Turn;
};


module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    container: {
      type: DataTypes.STRING,
    },
    containerId: {
      type: DataTypes.INTEGER,
    },
  });

  Item.protFuncs = function(models) {
    Item.prototype.getContainer = function(options) {
      var cap = this.get('container').substr(0, 1).toUpperCase();
      var rest = this.get('container').substr(1);
      var contName = cap + rest;
      return this['get' + contName](options);
    };
  };

  Item.associate = function(models) {
    Item.belongsTo(models.Tile, {
      foreignKey: 'containerId',
      constraints: false,
      as: 'Tile'
    });
    Item.belongsTo(models.InvSlot, {
      foreignKey: 'containerId',
      constraints: false,
      as: 'InvSlot'
    });
  };

  return Item;
};


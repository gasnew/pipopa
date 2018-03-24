module.exports = function(sequelize, DataTypes) {
  var InvSlot = sequelize.define('InvSlot', {
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  InvSlot.associate = function(models) {
    InvSlot.belongsTo(models.Inventory);
    InvSlot.hasOne(models.Item, {
      foreignKey: 'containerId',
      constraints: false,
      scope: {
        container: 'InvSlot'
      }
    });
  };

  return InvSlot;
};


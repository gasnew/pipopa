module.exports = function(sequelize, DataTypes) {
  var Chunk = sequelize.define('Chunk', {
    rows: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    cols: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  });

  Chunk.associate = function(models) {
    Chunk.hasMany(models.Tile);
  };

  return Chunk;
};


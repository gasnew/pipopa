var models = require('../models');

(async function() {
  await models.sequelize.sync({force: true});

  const HEIGHT = 50;
  const WIDTH = 50;

  var chunk = await models.Chunk.create({rows: HEIGHT, cols: WIDTH});
  // for (var x = 0; x < WIDTH; x++) {
  //   for (var y = 0; y < HEIGHT; y++) {
  //     await chunk.createTile({x: x, y: y});
  //   }
  // }

  console.log('ALL DONE!!');
  process.exit();
})();


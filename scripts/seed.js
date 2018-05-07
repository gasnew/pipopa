var models = require('../models');

(async function() {
  await models.sequelize.sync({force: true});

  console.log('ALL DONE!!');
  process.exit();
})();


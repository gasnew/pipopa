module.exports = {
  development: {
    username: 'root',
    password: 'my_pass',
    database: 'pipopa',
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};


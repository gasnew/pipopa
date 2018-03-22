var bcrypt = require('bcryptjs'),
  Q = require('q'),
  models = require('./models');

//used in local-signup strategy
exports.localReg = function (name, password) {
  var deferred = Q.defer();

  console.log(name);
  //check if name is already assigned in our database
  models.User.findOne({
    where: {
      'name': name
    }
  })
    .then(function (result) {
      if (null != result) {
        console.log('USERNAME ALREADY EXISTS:', result.name);
        deferred.resolve(false); // name exists
      } else  {
        var hash = bcrypt.hashSync(password, 8);
        var user = {
          'name': name,
          'password': hash,
        };

        console.log('CREATING USER:', name);
        models.User.create(user).then(u => {
          return models.Player.create({UserId: u.id, x: 25, y: 25});
        })
          .then(p => {
            return models.Turn.create({PlayerId: p.id, status: 'running'});
          })
          .then(() => {
            deferred.resolve(user);
          });
      }
    });

  return deferred.promise;
};


//check if user exists
//if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//if password matches take into website
//if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (name, password) {
  var deferred = Q.defer();

  models.User.findOne({
    where: {
      'name': name
    }
  })
    .then(function (result) {
      if (null == result) {
        console.log('USERNAME NOT FOUND:', name);

        deferred.resolve(false);
      } else {
        var hash = result.password;

        console.log('FOUND USER: ' + result.name);

        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(result);
        } else {
          console.log('AUTHENTICATION FAILED');
          deferred.resolve(false);
        }
      }
    });

  return deferred.promise;
};

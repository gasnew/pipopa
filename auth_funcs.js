var bcrypt = require('bcryptjs'),
    Q = require('q'),
    models = require('./models');

 //used in local-signup strategy
 exports.localReg = function (username, password) {
   var deferred = Q.defer();

   console.log(username);
   //check if username is already assigned in our database
   models.User.findOne({
     where: {
       'username' : username
     }
   })
   .then(function (result) {
     if (null != result) {
       console.log("USERNAME ALREADY EXISTS:", result.username);
       deferred.resolve(false); // username exists
     } else  {
       var hash = bcrypt.hashSync(password, 8);
       var user = {
         "username": username,
         "password": hash,
       };

       console.log("CREATING USER:", username);
       models.User.create(user);

       deferred.resolve(user);
     }
   });

   return deferred.promise;
 };


 //check if user exists
   //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
     //if password matches take into website
 //if user doesn't exist or password doesn't match tell them it failed
 exports.localAuth = function (username, password) {
   var deferred = Q.defer();

     models.User.findOne({
       where: {
         'username' : username
       }
     })
     .then(function (result) {
       if (null == result) {
         console.log("USERNAME NOT FOUND:", username);

         deferred.resolve(false);
       } else {
         var hash = result.password;

         console.log("FOUND USER: " + result.username);

         if (bcrypt.compareSync(password, hash)) {
           deferred.resolve(result);
         } else {
           console.log("AUTHENTICATION FAILED");
           deferred.resolve(false);
         }
       }
     });

   return deferred.promise;
 };

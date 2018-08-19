const jwt = require("jsonwebtoken"),
      {User} = require("../models"),
      {errorHandler} = require("./error");

exports.register = (req, res, next) => {
   for(field in req.body){ 
      req.body[field] = req.sanitize(req.body[field]);
      if(typeof req.body[field] === "string") req.body[field] = req.body[field].trim();
   };

   User.create(req.body)
      .then(user => res.status(200).json(signUser(user)))
      .catch(error => {
         if(!error.message || error.code === 11000) error = errorHandler(409, "Username is not available");
         return next(error);
      });
};

exports.login = (req, res, next) => {
   for(field in req.body) req.body[field] = req.sanitize(req.body[field]);

   const {username, password} = req.body;
   
   User.findOne({username})
      .then(user => {
         if(!user) throw errorHandler(404, "Incorrect Username/Password");
         return user.comparePassword(password)
                  .then(response => {
                     if(response === true)  return res.status(200).json(signUser(user));
                     throw response;
                  })
                  .catch(error => {
                     return next(error);
                  });
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

// MiddleWare should check if token
exports.verifyToken = (req, res) => {
   const {user} = req;
   return res.status(200).json(user);
};

const signUser = user => {
   const {username, isAdmin, id} = user,
         {SECRET, ALGORITHM} = process.env,
         token = jwt.sign({username, isAdmin, id}, SECRET, {expiresIn: "1h", algorithm: ALGORITHM});
         
   return {username, isAdmin, token, id, tokenExp: Date.now() + (3600 * 1000)};
};
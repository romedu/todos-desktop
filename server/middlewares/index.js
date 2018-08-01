const jwt    = require("jsonwebtoken"),
      {errorHandler} = require("../helpers/error");

exports.folder = require("./folder");
exports.todos  = require("./todos");

exports.checkIfToken = (req, res, next) => {
   let {token} = req.query;
   if(!token){
      let error = errorHandler(403, "You need a valid token to proceed!");
      return next(error);
   }
   return jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error){
               error.status = 403;
               return next(error);
            }
            req.user = decoded;
            return next();
         });
};

module.exports = exports;
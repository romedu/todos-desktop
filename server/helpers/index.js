const {errorHandler} = require("../helpers/error");

exports.filterResource = errorMessage => {
   return resource => {
      if(!resource) throw errorHandler(404, errorMessage);
      return resource;
   }
};

module.exports = exports;
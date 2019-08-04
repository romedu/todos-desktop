const jwt = require("jsonwebtoken"),
	{ errorHandler } = require("../helpers/error");

exports.folder = require("./folder");
exports.todos = require("./todos");

exports.checkIfToken = (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		let error = errorHandler(403, "You need a valid token to proceed!");
		return next(error);
	}
	return jwt.verify(token, process.env.SECRET, (error, decoded) => {
		if (error) {
			error.status = 403;
			return next(error);
		}
		req.locals.user = decoded;
		return next();
	});
};

exports.sanitizeBody = (req, res, next) => {
	for (field in req.body) {
		req.body[field] = req.sanitize(req.body[field]);
		if (typeof req.body[field] === "string")
			req.body[field] = req.body[field].trim();
	}
	return next();
};

module.exports = exports;

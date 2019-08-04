const { TodoList, Folder } = require("../models"),
	{ errorHandler } = require("../helpers/error"),
	{ filterResource } = require("../helpers");

exports.checkPermission = (req, res, next) => {
	const { isAdmin, id: userId } = req.locals.user;
	TodoList.findOne({ _id: req.params.id })
		.populate("creator")
		.exec()
		.then(filterResource("Not Found"))
		.then(list => {
			const { creator } = list;
			if (!isAdmin && creator.id !== userId)
				throw errorHandler(401, "You are not authorized");
			req.locals.creator = creator;
			return next();
		})
		.catch(error => {
			if (!error.status) error = errorHandler(404, "Not Found");
			return next(error);
		});
};

exports.ownerPrivileges = (req, res, next) => {
	const { user, creator } = req.locals;

	//If the user isn't an admin then it means he's the owner
	if (!user.isAdmin || !creator.isAdmin || creator.id === user.id)
		return next();
	return next(errorHandler(401, "You are not authorized to proceed"));
};

exports.ownerOnly = (req, res, next) => {
	const { user, creator } = req.locals;
	if (creator.id === user.id) return next();
	return next(errorHandler(401, "You are not authorized to proceed"));
};

exports.checkIfFolderOwner = (req, res, next) => {
	const { body, locals } = req,
		{ user } = locals;

	if (!body.folderName || body.folderName === "-- No Folder --") return next();
	return Folder.findOne({ name: body.folderName })
		.populate("creator")
		.exec()
		.then(filterResource("Not Found"))
		.then(foundFolder => {
			if (foundFolder.creator.id !== user.id)
				throw errorHandler(401, "You are not authorized to proceed");
			req.locals.newFolder = foundFolder;
			return next();
		})
		.catch(error => next(error));
};

const { Folder } = require("../models"),
	{ errorHandler } = require("../helpers/error"),
	{ filterResource } = require("./index");

// Find the current folder using the id parameter and pass it in the req.locals object as currentFolder
exports.getCurrentFolder = (req, res, next) => {
	Folder.findOne({ id: req.params.id })
		.then(filterResource.bind({}, "Not Found"))
		.then(foundFolder => {
			req.locals.currentFolder = foundFolder;
			next();
		})
		.catch(error => next(error));
};

// Populate the currentFolder's creator property, check if the current user is the folder owner or an admin,
// and pass in the creator property in the req.locals object
exports.checkPermission = (req, res, next) => {
	const { currentFolder } = req.locals;

	currentFolder
		.populate("creator")
		.exec()
		.then(populatedFolder => {
			const { creator } = populatedFolder,
				{ isAdmin, id: userId } = req.locals.user;

			if (!isAdmin && creator.id !== userId)
				throw errorHandler(401, "You are not authorized");
			req.locals.creator = creator;
			return next();
		})
		.catch(error => next(error));
};

exports.ownerPrivileges = (req, res, next) => {
	const { user, creator } = req.locals;

	//If the user isn't an admin then it means he's the owner
	if (!user.isAdmin || !creator.isAdmin || creator.id === user.id)
		return next();
	return next(errorHandler(401, "You are not authorized to proceed"));
};

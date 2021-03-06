const fs = require("fs"),
	os = require("os"),
	path = require("path"),
	{ TodoList, Todo, Folder } = require("../models"),
	{ errorHandler } = require("./error");

// Finds either all the todoLists or the ones in a specific folder
exports.find = async (req, res, next) => {
	try {
		const { isAdmin, id: userId } = req.locals.user,
			{ getAll, page, limit, sortProp, sortOrder, folderLess } = req.query,
			searchArg = isAdmin && getAll ? {} : { creator: userId },
			options = {
				sort: { [sortProp]: sortOrder },
				page,
				limit: Number(limit)
			};

		// This is used to find all the todoList that are not inisde of a folder
		if (folderLess) searchArg.folderName = undefined;

		const foundLists = limit
			? await TodoList.paginate(searchArg, options)
			: await TodoList.find(searchArg);

		if (!foundLists) throw errorHandler(404, "Not Found");
		return res.status(200).json(foundLists);
	} catch (error) {
		next(error);
	}
};

exports.create = async (req, res, next) => {
	try {
		const { body, locals } = req,
			{ currentListFolder, user } = locals;

		body.creator = user.id;

		const newList = await TodoList.create(body);

		// If the newList is inside of a folder, add it to that folder
		if (currentListFolder) {
			currentListFolder.files.push(newList.id);
			await currentListFolder.save();
		}

		return res.status(201).json(newList);
	} catch (error) {
		if (error.code === 11000) {
			error = errorHandler(
				409,
				"That name is not avaibale, please try another one"
			);
		}
		next(error);
	}
};

exports.findOne = async (req, res, next) => {
	try {
		const { currentList, creator } = req.locals,
			populatedList = await currentList.populate("todos").execPopulate();

		return res
			.status(200)
			.json({ ...populatedList._doc, creator: creator.id });
	} catch (error) {
		return next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		const { folderName, ...updateData } = req.body,
			{
				currentList,
				creator,
				currentListFolder: listNewFolder
			} = req.locals,
			options = {
				runValidators: true
			},
			updatedList = { ...currentList._doc, ...updateData };

		await currentList.updateOne(updateData, options);

		// Check if there is a folderName in the req.body and said folder is different than the one the list is inside of (if any)
		if (folderName && currentList.folderName !== folderName) {
			// Check if the updated list was inside of a folder
			if (currentList.folderName) {
				const oldFolder = await Folder.findOne({
					name: currentList.folderName
				});
				if (!oldFolder) throw errorHandler(404, "Not Found");

				// Remove the current list from the old folder
				oldFolder.files.pull(currentList.id);
				await oldFolder.save();
			}
			// Check if the list was moved to a folder
			if (folderName !== "-- No Folder --") {
				// Add the current list to the new folder
				listNewFolder.files.push(currentList.id);
				currentList.folderName = listNewFolder.name;
				updatedList.folderName = listNewFolder.name;
				await listNewFolder.save();
				await currentList.save();
			} else {
				currentList.folderName = null;
				updatedList.folderName = null;
				await currentList.save();
			}
		}

		return res.status(200).json({ ...updatedList, creator: creator.id });
	} catch (error) {
		return next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const { currentList: listToDelete } = req.locals;

		await listToDelete.delete();

		// If the list is inside a folder, remove its reference from it
		if (listToDelete.folderName) {
			const currentListFolder = await Folder.findOne({
				name: listToDelete.folderName
			});
			if (!currentListFolder) throw errorHandler(404, "Not Found");
			currentListFolder.files.pull(listToDelete.id);
			await currentListFolder.save();
		}

		// Delete all of the todos from the list
		await Todo.deleteMany({ container: listToDelete.id });

		return res
			.status(200)
			.json({ message: "Todo List Removed Successfully" });
	} catch (error) {
		next(error);
	}
};

// The file will contain the description of all of the todos in the list separated by a new line
exports.downloadFile = async (req, res, next) => {
	try {
		const tempDirPath = os.tmpdir(),
			{ currentList } = req.locals,
			populatedList = await currentList.populate("todos").execPopulate(),
			{
				name: listName,
				todos: listTodos,
				folderName: listFolderName
			} = populatedList,
			fileText = `${
				listFolderName ? listFolderName + "\n" : ""
			}${listName}: \n\n${listTodos
				.map(todo => `• ${todo.description}`)
				.join("\n")}`;

		fs.mkdtemp(`${tempDirPath}${path.sep}`, (error, folderPath) => {
			if (error) throw errorHandler(500, error.message);
			const tempFilePath = `${folderPath}${path.sep}todo-download.txt`;

			fs.writeFile(tempFilePath, fileText, error => {
				if (error) throw errorHandler(500, error.message);
				return res.download(tempFilePath);
			});
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = exports;

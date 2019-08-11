const app = require("express")(),
	cors = require("cors"),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	serializeError = require("serialize-error"),
	expressSanitizer = require("express-sanitizer"),
	PORT = process.env.PORT || 3000,
	{
		authRoutes,
		folderRoutes,
		todoListRoutes,
		todoRoutes,
		servicesRoutes
	} = require("./routes"),
	{ checkIfToken, sanitizeBody, todos } = require("./middlewares"),
	{ errorHandler } = require("./helpers/error");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(morgan("tiny"));

app.use(sanitizeBody);
app.use("/api/auth", authRoutes);
app.use("/api", checkIfToken);
app.use(
	"/api/todos/:id/todo",
	todos.getCurrentList,
	todos.checkPermission,
	todoRoutes
);
app.use("/api/todos", todoListRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/services", servicesRoutes);
app.get("*", (req, res, next) => next(errorHandler(404, "Route not found")));

app.use((error, req, res, next) => {
	error = serializeError(error);
	if (!error.status) error.status = 500;
	delete error.stack;
	return res.json(error);
});

app.listen(PORT, () => {
	console.log("Todos r' Up");
});

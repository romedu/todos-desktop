require("dotenv").config();

const app              = require("express")(),
      cors             = require("cors"),
      // morgan           = require("morgan"),
      bodyParser       = require("body-parser"),
      serializeError   = require("serialize-error"),
      expressSanitizer = require("express-sanitizer"),
      PORT             = process.env.PORT || 3000,
      {authRoutes, folderRoutes, todoListRoutes, todoRoutes} = require("./routes"),
      {checkIfToken, todos} = require("./middlewares"),
      {errorHandler}   = require("./helpers/error");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// app.use(morgan("tiny"));

app.use("/api/auth", authRoutes);
app.use("/api", checkIfToken);
app.use("/api/todos/:id/todo", todos.checkPermission, todoRoutes);
app.use("/api/todos", todoListRoutes);
app.use("/api/folder", folderRoutes);
app.get("*", (req, res, next) => next(errorHandler(404, "Route not found")));

app.use((error, req, res, next) => {
   error = serializeError(error);
   if(!error.status) error.status = 500;
   delete error.stack;
   res.json(error);
});

app.listen(PORT, () => {
   console.log("Todos r' Up");
});
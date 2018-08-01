const mongoose = require("mongoose"),
      todoListSchema = new mongoose.Schema({
         name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 14,
         }, 
         image: String,
         folderName: {
            type: String,
            minlength: 3,
            maxlength: 14
         }, 
         todos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
         }],
         creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
      },
      {timestamps: true});

module.exports = mongoose.model("TodoList", todoListSchema);
const mongoosePaginate = require("mongoose-paginate"),
      validator = require("../helpers/validator");

const mongoose = require("mongoose"),
      folderSchema = new mongoose.Schema({
         name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 14,
            validate: {
               validator: validator.alphanumOnly,
               message: "Only alphanumeric and space characters are allowed"
            }
         },
         description: {
            type: String, 
            minlength: 3,
            maxlength: 60
         }, 
         image: String,
         files: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "TodoList"
            }
         ],
         creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
      },
      {timestamps: true});

folderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Folder", folderSchema);
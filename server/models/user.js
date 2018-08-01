const mongoose   = require("mongoose"),
      bcrypt     = require("bcrypt"),
      userSchema = new mongoose.Schema({
         username: {
            type: String, 
            required: true,
            unique: true,
            minlength: 4,
            maxlength: 20
         },
         // email: {
         //    type: String,
         //    required: true,
         //    unique: true
         // },
         password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 24
         },
         isAdmin: {
            type: Boolean,
            default: false
         }
      });
      
userSchema.pre("save", async function(next){
   try {
      if(!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 11);
      return next();
      
   } catch(error) {
      error.status = 500;
      return next(error);
   }
});

userSchema.methods.comparePassword = async function(passedPassword, next){
   try {
      let compareResult = await bcrypt.compare(passedPassword, this.password);
      if(!compareResult) throw new Error("Incorrect Username/Password");
      return compareResult;
   } 
   catch(error){
      error.status = 404;
      return error;
   }
};

module.exports = mongoose.model("User", userSchema);
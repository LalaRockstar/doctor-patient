const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An user must have a name"],
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "recep", "doctor", "reporter", "user"],
      message: "User is either Admin,Recap,Doctor or Reporter",
    },
    default: "user",
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  password: {
    type: String,
    required: [true, "please type password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords must be same",
    },
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.passwordCompare = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

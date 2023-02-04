const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    default: [],
  },
  enrolledCourses: {
    type: Array,
    default: [],
  },
});

userSchema.statics.findUserById = async function (userId) {
  const user = await this.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw new Error("All fields must be filled");
  if (!validator.isEmail(email)) {
    throw new Error("Email not Valid");
  }
  const user = await this.findOne({ email, password });
  if (!user) throw Error("Wrong Credentials");
  return user;
};

userSchema.statics.signup = async function (name, email, password) {
  if (!email || !password || !name) throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Email not Valid");
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const user = await this.create({ name, email, password });
  return user;
};

userSchema.statics.getCart = async function (id) {
  const user = await this.findOne({ _id: id });
  return user.cartItems;
};

userSchema.statics.addToCart = async function (id, course) {
  const user = await this.findOne({ _id: id });
  if (user.cartItems.find((c) => c._id === course._id))
    throw Error("Already added to cart");
  user.cartItems.push(course);
  await user.save();
  return user.cartItems;
};

userSchema.statics.removeFromCart = async function (id, course) {
  const user = await this.findOne({ _id: id });
  user.cartItems = user.cartItems.filter((c) => c._id !== course._id);
  await user.save();
  return user.cartItems;
};

userSchema.statics.emptyCart = async function (id) {
  const user = await this.findOne({ _id: id });
  user.enrolledCourses = [...user.enrolledCourses, ...user.cartItems];
  user.cartItems = [];
  await user.save();
  return user.cartItems;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

const User = require("../models/User");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  const { id } = req.body;
  try {
    const courses = await User.getCart(id);
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { id, course } = req.body;
  try {
    const courses = await User.addToCart(id, course);
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { id, course } = req.body;
  try {
    const courses = await User.removeFromCart(id, course);
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const emptyCart = async (req, res) => {
  const { id } = req.body;
  try {
    const courses = await User.emptyCart(id);
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getCart,
  addToCart,
  removeFromCart,
  emptyCart,
  getUser,
};

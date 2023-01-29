const router = require("express").Router();
const {
  loginUser,
  signupUser,
  getCart,
  addToCart,
  removeFromCart,
  emptyCart,
  getUser
} = require("../controllers/userController");
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/getEnrolledCourses", getCart);
router.post("/enrollCourse", addToCart);
router.post("/unenrollCourse", removeFromCart);
router.post("/emptyCart", emptyCart);
router.post('/getUser',getUser)

module.exports = router;

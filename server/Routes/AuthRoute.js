const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware"); // Import the middleware
const router = require("express").Router();

router.post("/", userVerification); // Ensure the middleware is defined
router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
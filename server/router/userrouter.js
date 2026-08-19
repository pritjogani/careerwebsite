const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');
const validate = require('../middleware/validator-middleware');
const auth = require('../validators/user-schema');
const usermiddleware = require('../middleware/usermiddleware');



router.route("/").get(usercontroller.home);
router.route("/register").post(validate(auth.signupSchema),usercontroller.register);
router.route("/login").post(validate(auth.loginSchema),usercontroller.login);
router.route("/user").get(usermiddleware,usercontroller.user);
router.route("/user/update").patch(usermiddleware, usercontroller.updateUser);
module.exports = router;

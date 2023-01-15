const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authenticate = require("../utils/authenticate");

router.get("/", userController.getUsers);
router.get("/:uid", userController.getSingleUser);
router.post("/", authenticate, userController.createUser);
router.put("/:uid", authenticate, userController.updateUser);
router.delete("/:uid", authenticate, userController.deleteUser);

module.exports = router;

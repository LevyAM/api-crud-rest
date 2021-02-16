const express = require("express");
const {validate, createUserValidation, findUserValidation, loginValidation } = require("../middleware/validation");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.use(express.json());

router.get("/users", UserController.find);
router.get("/users/:id", findUserValidation(), validate, UserController.findUser);
router.post("/users", createUserValidation(), validate, UserController.create);
router.put("/users/:id", findUserValidation(), validate, UserController.update);
router.delete("/users/:id", findUserValidation(), validate, UserController.delete);
router.post("/login", UserController.login);


module.exports = router;

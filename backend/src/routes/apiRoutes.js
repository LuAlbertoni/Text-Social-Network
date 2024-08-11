const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostsByUser);

router.post("/post", authMiddleware, postController.createPost);
router.delete("/post/:id", authMiddleware, postController.deletePost);

router.get("/user/getBasicUserInfo/:id", userController.getBasicUserInfo);

router.get("/user/getUserInfo/:id", authMiddleware, userController.getUserInfo);
router.put("/user/updateUserInfo/:id", authMiddleware, userController.updateUserInfo);
router.delete("/user/deleteUser/:id", authMiddleware, userController.deleteUser);

module.exports = router;
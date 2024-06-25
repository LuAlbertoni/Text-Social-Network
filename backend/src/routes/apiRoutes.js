const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/post", authMiddleware, postController.createPost);
router.get("/posts", authMiddleware, postController.getPosts);
router.get("/posts/:id", authMiddleware, postController.getPostsByUser);
router.delete("/post/:id", authMiddleware, postController.deletePost);

module.exports = router;
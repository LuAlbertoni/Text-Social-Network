const { Post, User } = require("../models");

exports.createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "O post deve ter conteúdo" });
  }

  try {
    const post = await Post.create({ content, userId: req.user.id });
    res.status(201).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });

    if (posts.length === 0) {
      return res.json({ posts });
    }

    res.json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do post deve ser um número válido" });
    }

    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para excluir este post" });
    }

    await post.destroy();

    res.json({ message: "Post excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do usuário deve ser um número válido" });
    }

    const posts = await Post.findAll({
      where: { userId: id },
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });

    if (posts.length === 0) {
      return res.json({ posts });
    }

    res.json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

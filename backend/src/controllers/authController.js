const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

exports.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res
      .status(400)
      .json({ error: "Nome de usuário, email e senha são obrigatórios" });
  }

  const { username, email, password } = req.body;

  try {
    if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: "Nome de usuário já cadastrado" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    await User.create({ username, email, password });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user;

    if (username) {
      if (username.includes("@")) {
        user = await User.findOne({ where: { email: username } });
      } else {
        user = await User.findOne({ where: { username } });
      }
    } else {
      return res
        .status(400)
        .json({ error: "O email ou nome de usuário é obrigatório" });
    }

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

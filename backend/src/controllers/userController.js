const { User } = require("../models");

exports.getBasicUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do usuário deve ser um número válido" });
    }

    const user = await User.findOne({
      where: { id },
      attributes: ["id", "username", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do usuário deve ser um número válido" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    delete user.dataValues.password;

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do usuário deve ser um número válido" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    if (username) {
      const usernameExists = await User.findOne({ where: { username } });

      if (usernameExists) {
        return res.status(400).json({ error: "Nome de usuário já existe" });
      }
      
      user.username = username;
    }

    if (email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: "Email já existe" });
      }
      
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    delete user.dataValues.password;

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID do usuário deve ser um número válido" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.user.id !== user.id) {
      return res.status(403).json({ error: "Sem permissão" });
    }

    await user.destroy();

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

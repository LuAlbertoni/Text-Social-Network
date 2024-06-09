const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Nenhum token fornecido" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });
    
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Não autorizado" });
  }
};

module.exports = authMiddleware;

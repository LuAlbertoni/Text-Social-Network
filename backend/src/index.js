const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { sequelize } = require("./models");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 80;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados: ", err);
  });

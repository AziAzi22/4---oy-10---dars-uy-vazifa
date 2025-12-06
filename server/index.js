const express = require("express");
const cors = require("cors");
const todoRouter = require("./router/todo.routes");
const authRoter = require("./router/auth.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// router
app.use(todoRouter);
app.use(authRoter);

app.listen(PORT, () => {
  console.log("Sever is runnig at:", PORT);
});

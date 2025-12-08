const { Router } = require("express");
const {
  getAllTodo,
  getOneTodo,
  addTodo,
  upgradeTodo,
  deleteTodo,
  getAllUser,
} = require("../controller/todo.controller");
const authorization = require("../middleware/checkname");

const todoRouter = Router();

todoRouter.get("/get_all_todo", getAllTodo);
todoRouter.get("/get_one_tod/:id", getOneTodo);
todoRouter.post("/add_todo", addTodo);
todoRouter.patch("/update_todo/:id", upgradeTodo);
todoRouter.delete("/delete_todo/:id", deleteTodo);
todoRouter.get("/get_all_user", getAllUser);

module.exports = todoRouter;

const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/file-manager");

// get all

const getAllTodo = async (req, res) => {
  try {
    const todoList = read_file("todo.json");
    res.status(200).json(todoList);
  } catch (error) {
    console.log(error.message);
  }
};

// get user

const getAllUser = async (req, res) => {
  try {
    const User = read_file("user.json");
    res.status(200).json(User);
  } catch (error) {
    console.log(error.message);
  }
};

// add Todo

const addTodo = async (req, res) => {
  try {
    const todoList = read_file("todo.json");
    const { title, list } = req.body;
    // const username = req.user.username;

        if (!title || !list) {
      return res.status(400).json({
        message: "title and list are required",
      });
    }
    todoList.push({
      id: v4(),
      title,
      list: [...list],
    });
    write_file("todo.json", todoList);
    res.status(200).json({
      message: "Added new Todo",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// // add list

// const addList = async (req, res) => {
//   try {
//     const todoList = read_file("todo.json");
//     const { list } = req.body;
//     const { id } = req.params;
//     const foundedTodo = todoList.find((todo) => todo.id === id);

//     if (!foundedTodo) {
//       return res.status(404).json("Todo not found");
//     }

//     todoList.forEach((todo) => {
//       if (todo.id === id) {
//         foundedTodo.list.push(list);
//       }
//     });

//     write_file("todo.json", todoList);
//     res.status(200).json("added new list");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// get one

const getOneTodo = async (req, res) => {
  try {
    const todoList = read_file("todo.json");
    const { id } = req.params;
    const foundedTodo = todoList.find((todo) => todo.id === id);

    if (!foundedTodo) {
      return res.status(404).json("Todo not found");
    }

    res.status(200).json(foundedTodo);
  } catch (error) {
    console.log(error.message);
  }
};

/// upgarde

const upgradeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = read_file("todo.json");
    const { title, list } = req.body;
    const foundedTodo = todoList.find((todo) => todo.id === id);

    if (!foundedTodo) {
      return res.status(404).json("Todo not found");
    }

    todoList.forEach((todo) => {
      if (todo.id === id) {
        todo.title = title ? title : todo.title;
        todo.list = list ? list : todo.list;
      }
    });

    write_file("todo.json", todoList);
    res.status("201").json("Update todo");
  } catch (error) {
    console.log(error.message);
  }
};

/// delete

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = read_file("todo.json");
    const foundedTodo = todoList.find((todo) => todo.id === id);

    if (!foundedTodo) {
      return res.status(404).json("Todo not found");
    }

    todoList.forEach((todo, idx) => {
      if (todo.id === id) {
        todoList.splice(idx, 1);
      }
    });
    write_file("todo.json", todoList);
    res.status(201).json({
      message: "Todo is deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addTodo,
  getOneTodo,
  deleteTodo,
  getAllTodo,
  upgradeTodo,
  getAllUser,
};

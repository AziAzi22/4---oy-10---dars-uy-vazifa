const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/file-manager");
const bcrypt = require("bcryptjs");
// register

const register = async (req, res) => {
  try {
    const user = read_file("user.json");
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email, password are required",
      });
    }

    const foundedEmail = user.find((user) => user.email === email);

    if (foundedEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const foundedUserName = user.find((user) => user.username === username);

    if (foundedUserName) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }
    const hash = await bcrypt.hash(password, 14);

    user.push({
      id: v4(),
      role: "user",
      username,
      email,
      password: hash,
    });

    write_file("user.json", user);
    res.status(201).json({
      message: "registred ✌️",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// login

const login = async (req, res) => {
  const user = read_file("user.json");
  const { email, password } = req.body;

  const foundedUser = user.find((user) => user.email === email);

  if (!foundedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const decode = await bcrypt.compare(password, foundedUser.password);

  if (decode) {
    res.status(200).json({
      message: "Succes",
    });
  } else {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
};

module.exports = {
  register,
  login,
};

import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [list, setList] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // get/
  const getTodo = () => {
    fetch("http://localhost:4444/get_all_todo")
      .then((res) => res.json())
      .then((info) => setTodo(info))
      .catch((error) => console.log(error.message));
  };

  // getUser
  const getUser = () => {
    fetch("http://localhost:4444/get_all_user")
      .then((res) => res.json())
      .then((info) => setUser(info))
      .catch((error) => console.log(error.message));
  };

  // add

  const addTodo = (event) => {
    event.preventDefault();
    fetch("http://localhost:4444/add_todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        list: list.split(",").map((t) => t.trim()),
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        getTodo();
      })
      .catch((error) => console.log(error.message));
  };

  // delete
  const deleteTodo = (id) => {
    fetch("http://localhost:4444/delete_todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        getTodo();
      })
      .catch((error) => console.log(error.message));
  };

  // register

  const myRegister = (event) => {
    event.preventDefault();

    fetch("http://localhost:4444/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        getUser();
        setIsRegister(false);
      })
      .catch((error) => console.log(error.message));
  };

  /// login

  const myLogin = (event) => {
    event.preventDefault();

    fetch("http://localhost:4444/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        setIsLogin(false);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getTodo(), getUser();
  }, []);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            My TodoList
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="ms-auto d-flex" role="search">
              <button
                type="button"
                className="btn btn-outline-success me-2"
                onClick={() => setIsLogin(true)}
              >
                login
              </button>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setIsRegister(true)}
              >
                register
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* modal */}

      {/* LOGIN MODAL */}
      <div
        className={`modal fade ${isLogin ? "show" : ""}`}
        style={{ display: isLogin ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={myLogin}>
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsLogin(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* REGISTER MODAL */}
      <div
        className={`modal fade ${isRegister ? "show" : ""}`}
        style={{ display: isRegister ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={myRegister}>
              <div className="modal-header">
                <h5 className="modal-title">Register</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsRegister(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* modal */}

      <h2 className="mt-5">Add Todo</h2>
      <form className="mt-4 py-4" onSubmit={addTodo}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="title__"
          value={title}
          onChange={(el) => setTitle(el.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="list__"
          value={list}
          onChange={(el) => setList(el.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          send
        </button>
      </form>
      <div className="card-box">
        {todo.map((item) => (
          <div key={item.id} className="todo-card">
            <h3>{item.title}</h3>
            <ul>
              {item.list.map((e, i) => (
                <li key={i}>
                  <input type="checkbox" />
                  {e}
                </li>
              ))}
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(item.id)}
              >
                delete
              </button>
            </ul>
          </div>
        ))}
        <div className="todo-card">
          <h3>Users</h3>
          {user.map((user, index) => (
            <p key={user.id}>
              {index + 1}. {user.username}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

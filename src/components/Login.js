import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.get("https://647783419233e82dd53bc684.mockapi.io/mypham/user", {
        params: {
          name,
          password,
        },
      });

      if (res.data.length > 0) {
        history("/home", { state: { id: name } });
      } else {
        alert("Người dùng chưa đăng ký");
      }
    } catch (e) {
      alert("Lỗi");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <div className="container">
        <h1>Sign in</h1>

        <form action="POST">
          <div>
            <label>Tên đăng nhập</label>
            <br />
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Tên đăng nhập"
            />
          </div>
          <br />
          <div>
            <label>Password</label>
            <br />
            <input
              className="form-control"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <br />
          <input className="btn btn-primary" type="submit" onClick={submit} />
        </form>
        <p>OR</p>
        <Link className="btn btn-primary" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;

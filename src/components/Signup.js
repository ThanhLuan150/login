import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);//thay đổi giá trị cho biến

  async function checkUsernameAvailability(names) {//? đó là toán tử ba ngôi
    try {
      const response = await axios.get(`https://647783419233e82dd53bc684.mockapi.io/mypham/user?name=${names}`);
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function checkEmailAvailability(email) {
    try {
      const response = await axios.get("https://647783419233e82dd53bc684.mockapi.io/mypham/user", {
        params: {
          email: email,
        },
      });
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const isTaken = await checkUsernameAvailability(name);
      const isEmailTaken = await checkEmailAvailability(email);

      if (isTaken) {
        setIsUsernameTaken(true);
        return;
      }

      if (isEmailTaken) {
        setIsEmailTaken(true);
        return;
      }

      const res = await axios.post("https://647783419233e82dd53bc684.mockapi.io/mypham/user", {
        email,
        name,
        password,
      });

      if (res.status === 201) {
        history("/login", { state: { id: email } });
        alert("Bạn đã đăng ký thành công");
      } else if (res.status === 200) {
        alert("Tài khoản đã tồn tại");
      }
    } catch (error) {
      alert("Đã xảy ra lỗi");
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="container">
        <h1>Đăng ký</h1>

        <form action="POST">
          <div className="form-group">
            <label>Email</label>
            <input
              className={`form-control ${isEmailTaken ? "is-invalid" : ""}`}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailTaken(false);
              }}
              placeholder="Nhập email"
            />
            {isEmailTaken && <div className="invalid-feedback">Email đã tồn tại</div>}
          </div>
          <br />
          <div>
            <label>Tên đăng nhập</label>
            <br />
            <input
              className={`form-control ${isUsernameTaken ? "is-invalid" : ""}`}
              type="text"
              onChange={async (e) => {
                setName(e.target.value);
                setIsUsernameTaken(await checkUsernameAvailability(e.target.value));
              }}
              placeholder="Tên đăng nhập"
            />
            {isUsernameTaken && <div className="invalid-feedback">Tên đăng nhập đã tồn tại</div>}
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
          <input className="btn btn-primary" type="submit" onClick={submit} value="Đăng ký" />
        </form>
        <p>Hoặc</p>
        <Link className="btn btn-primary" to="/login">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default Signup;

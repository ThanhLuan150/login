import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    alert("Bạn có chắc bạn muốn đăng xuất");
    navigate("/login");
  };

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to the home</h1>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Home;

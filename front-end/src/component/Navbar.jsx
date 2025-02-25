import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/userSlice";
import { clearToken } from "../features/tokenSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    navigate("/signUp");
  };

  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://tse2.mm.bing.net/th?id=OIP.LD0EnujnYdGECGN1iLSM9AHaHa&pid=Api&P=0&h=180"
      />

      {user.name ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link onClick={logout} to="/signUp">
              Logout ({user.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signUp">Sign UP</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

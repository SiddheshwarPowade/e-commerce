import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { setToken } from "../features/tokenSlice";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const user = useSelector((state) => state.loginUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.name) {
      navigate("/");
    }
  }, []);

  const collectDetails = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.returnCode === 1) {
      dispatch(setUser(result.data.result));
      dispatch(setToken(result.data.auth));
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="appButton" type="button" onClick={collectDetails}>
        Sign UP
      </button>
    </div>
  );
};

export default SignUp;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { setToken } from "../features/tokenSlice";
import { showErrorToast } from "../common/Toast";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser);

  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  React.useEffect(() => {
    if (user.name) {
      navigate("/");
    }
  }, []);

  const handleLogin = async ({ email, password }) => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.returnCode === 1) {
      dispatch(setUser(result.data.user));
      dispatch(setToken(result.data.auth));
      navigate("/");
    } else {
      showErrorToast("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="email"
              className="inputBox"
              placeholder="Enter Email"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.email && <p className="invalid-input">Enter valid email</p>}

        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="password"
              className="inputBox"
              placeholder="Enter Password"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        {errors.password && (
          <p className="invalid-input">Enter valid password</p>
        )}

        <input className="appButton" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;

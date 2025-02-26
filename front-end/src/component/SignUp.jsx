import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { setToken } from "../features/tokenSlice";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const user = useSelector((state) => state.loginUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  React.useEffect(() => {
    if (user.name) {
      navigate("/");
    }
  }, []);

  const collectDetails = async ({ name, email, password }) => {
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
      <form onSubmit={handleSubmit(collectDetails)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          )}
        />

        {errors.name && <p className="invalid-input">Enter valid name</p>}

        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="email"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Enter Email"
            />
          )}
        />

        {errors.email && <p className="invalid-input">Enter Valid email</p>}

        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="password"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Enter Password"
            />
          )}
        />

        {errors.password && (
          <p className="invalid-input">Enter valid Password</p>
        )}

        <input className="appButton" type="submit" value="Sign UP" />
      </form>
    </div>
  );
};

export default SignUp;

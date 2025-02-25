import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const user = useSelector((state) => state.loginUser);

  return user.name ? <Outlet /> : <Navigate to={"/signUp"} />;
};

export default PrivateComponent;

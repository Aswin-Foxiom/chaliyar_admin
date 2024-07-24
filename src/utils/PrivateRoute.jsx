// PrivateRoute.jsx
import React, { useContext } from "react";
import { ContextDatas } from "../services/Context"; // Adjust the path as per your file structure
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { User } = useContext(ContextDatas);

  if (!User) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;

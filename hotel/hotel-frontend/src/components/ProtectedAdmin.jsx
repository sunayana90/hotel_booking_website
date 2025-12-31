import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

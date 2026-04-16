import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, roles, children }) {

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
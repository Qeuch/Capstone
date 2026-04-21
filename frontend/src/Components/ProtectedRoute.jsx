import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  currentUser,
  allowedRole,
  children,
}) {

  // wait if not ready yet
  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !currentUser.username) {
    return <Navigate to="/not-authorized" replace />;
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
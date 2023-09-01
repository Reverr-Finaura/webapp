import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const blogUser = useSelector((state) => state.blogUser);
  if (blogUser.blogUser === null) {
    return <Navigate to="/blogsignin" replace />;
  }

  return children;
};

export default ProtectedRoute;

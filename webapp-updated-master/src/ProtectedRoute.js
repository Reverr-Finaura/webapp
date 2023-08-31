import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const blogUser = useSelector((state) => state.blogUser);
  // if (!blogUser.blogUser) {
  //   return <Navigate to="/blogsignin" replace />;
  // }

  // return children;
  const storedBlogUser = localStorage.getItem("blogUser");
  if(storedBlogUser === null){
    return <Navigate to="/blogsignin" replace />;
  }
};

export default ProtectedRoute;

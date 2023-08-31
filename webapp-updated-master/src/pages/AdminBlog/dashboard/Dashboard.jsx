import BlogDisplayCard from "../../../components/displayCard/BlogDisplayCard";
import { useDispatch, useSelector } from "react-redux";
import styles from  "./dashboard.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../../features/blogUserSlice";
import { setBlogs } from "../../../features/createBlogSlice";
import { getBlogsFromDatabase } from "../../../firebase";
import { useEffect, useState } from "react";
import { HourglassSplit } from "react-bootstrap-icons";

const BlogDashboard = () => {
  const dispatch = useDispatch();
  const blogUser = useSelector((state) => state.blogUser);
  const blogs = useSelector((state) => state.blogs);
  const [isLoading, setIsLoading] = useState(true);
  const getBlogs = async () => {
    const results = await getBlogsFromDatabase();
    if (results.length) {
      dispatch(setBlogs(results));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBlogs();
    console.log('blogUser state after login:', blogUser);
  }, []);

  return (
    <>
      <div className={styles.Dashboard_MainContainer}>
        <div className={styles.Dashboard_Container}>
          <div className={styles.L_Container}>
            <h1 style={{ color: "grey" }}>Admin</h1>
            <h3>{blogUser !== null ? blogUser.blogUser : "User"}</h3>
            <Link to="/create-blog">
              <button className={styles.createPost}>Create Post</button>
            </Link>
            <button className={styles.logout} onClick={() => dispatch(logout())}>Logout</button>
          </div>
          <div className={styles.R_Container}>
            {isLoading ? (
              <h3>
                Fetching <HourglassSplit /> Blogs
              </h3>
            ) : (
              blogs.blogs.map((data) => (
                <BlogDisplayCard key={data.id} data={data} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDashboard;

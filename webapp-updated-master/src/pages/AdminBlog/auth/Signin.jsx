import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdminsFromDatabase } from "../../../firebase";
import { login } from "../../../features/blogUserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./signin.module.css";
const SignIn = () => {
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const blogUser = useSelector((state) => state.blogUser);

  const getAdmin = async () => {
    const results = await getAdminsFromDatabase();
    if (results.length) {
      setAdmins([...results]);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const checkEmailandPassword = () => {
    if (email.length && password.length) {
      console.log(email, password);
      console.log("admins",admins)
      const filteredAdmin = admins.filter(
        (data) => data.email === email && data.password === password
      );
      if (filteredAdmin.length) {
        dispatch(login(email));
        console.log("loged in");
        console.log("blogUser :",blogUser);
        
        navigate("/blogdashboard");
      } else {
        toast.error("Please enter a valid email or password !", {
          autoClose: 2000,
        });
        console.log(" not loged in");

      }
    } else {
      toast.error("Fields Can't be empty !", { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className={styles.SignIn_MainContainer}>
        <h1 style={{ color: "grey" }}>Admin</h1>
        <div className={styles.SignIn_Container}>
          <p>SignIn</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={checkEmailandPassword} className={styles.SingIn_Btn}>
            Sign In
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;

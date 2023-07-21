import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import styles from "./ChangePasswordUpdated.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePasswordUpdated({ email }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [changePassForm, setChangePassForm] = useState({
    // oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // const userDoc = useSelector((state) => state.userDoc);
  const theme = useSelector((state) => state.themeColor);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // useEffect(() => {
  //   if (!otp) {
  //     navigate("/");
  //   }
  // }, [otp]);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === email) {
          // dispatch(setUserDoc(doc.data()));
          setOldPass(doc.data().password);
        }
      });
    }
    fetchUserDocFromFirebase();
  }, []);

  function handleChangePassFormInputChange(e) {
    const { name, value } = e.target;

    setChangePassForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleChangePassBtnClick() {
    setLoading(true);
    if (changePassForm.confirmNewPass === "" || changePassForm.newPass === "") {
      toast.error("Kindly Fill all Inputs");
      setLoading(false);
      return;
    }
    // if (changePassForm.oldPass !== otp) {
    //   toast.error("Wrong OTP Entered");
    //   setLoading(false);
    //   return;
    // }

    if (changePassForm.newPass !== changePassForm.confirmNewPass) {
      toast.error("Password Doesn't Match");
      setLoading(false);
      return;
    }

    toast("Processing Your request");
    updateUserDocInFirebase();
  }

  async function updateUserDocInFirebase() {
    try {
      await signInWithEmailAndPassword(auth, email, oldPass);
      await updatePassword(auth.currentUser, changePassForm.newPass);
      await updateDoc(doc(db, "Users", email), {
        password: changePassForm.newPass,
      });
      toast.success("Successfully Updated Password");
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <NavBarFinalDarkMode isLoggedIn={false} />
      <div className={styles.mainContent}>
        <div className={styles.hiddenOnDesktop}>
          <text style={{ fontSize: 20, color: "#ffffff" }}>
            Change Password
          </text>
          <img
            className={styles.mainImage}
            src={require("../../images/changepassword.png")}
            alt="img"
          />
        </div>

        <div className={styles.leftComponent}>
          <text
            className={styles.hiddenOnMobile}
            style={{ fontSize: 35, color: "#ffffff", marginBlock: 20 }}
          >
            Change Password
          </text>
          <div className={styles.passInput}>
            <text style={{ fontSize: 10, color: "#ffffff" }}>Password</text>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="⋆⋆⋆⋆⋆⋆"
                name="newPass"
                value={changePassForm.newPass}
                onChange={handleChangePassFormInputChange}
              />

              <button
                className={styles.toggleButton}
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className={styles.passInput}>
            <text style={{ fontSize: 10, color: "#ffffff" }}>
              Confirm Password
            </text>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="⋆⋆⋆⋆⋆⋆"
                name="confirmNewPass"
                value={changePassForm.confirmNewPass}
                onChange={handleChangePassFormInputChange}
              />
              <button
                className={styles.toggleButton}
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            style={{ cursor: loading ? "default" : "" }}
            onClick={handleChangePassBtnClick}
            disabled={loading}
          >
            Submit
          </button>
        </div>
        <div className={styles.hiddenOnMobile}>
          <img
            className={styles.mainImage}
            src={require("../../images/changepassword.png")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordUpdated;

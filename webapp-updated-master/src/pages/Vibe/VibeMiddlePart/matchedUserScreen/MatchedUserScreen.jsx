import styles from "./MatchedUserScreen.module.css";
import backgroundLinesImg from "../../../../images/backgroundLinesImg.svg";
import defaultImg from "../../../../images/default-profile-pic.webp";

const MatchedUserScreen = ({ handleKeepSwiping, matchedUser }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.titleCont}>
            <h3 className={styles.title}>It’s a match!!</h3>
          </div>
          <div className={styles.profileCont}>
            <img
              className={styles.linesImg}
              src={backgroundLinesImg}
              alt='backgroundLinesImg'
            />
            <div className={styles.profileBgLeft}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.profileImg}
                  src={
                    matchedUser?.matchedUserData?.image
                      ? matchedUser?.matchedUserData?.image
                      : defaultImg
                  }
                  alt='user profile'
                />
              </div>
            </div>
            <div className={styles.profileBgRight}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.profileImg}
                  src={
                    matchedUser?.currentUserData?.image
                      ? matchedUser?.currentUserData?.image
                      : defaultImg
                  }
                  alt='user profile'
                />
              </div>
            </div>
          </div>
          <div className={styles.textCont}>
            <p className={styles.text}>
              You and <span>{matchedUser?.matchedUserData?.name}</span> matched
              !{" "}
            </p>
            <p className={styles.subText}>
              Go send a hello or keep looking for more matches
            </p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <button onClick={handleKeepSwiping} className={styles.greetBtn}>
            Keep Swiping
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchedUserScreen;

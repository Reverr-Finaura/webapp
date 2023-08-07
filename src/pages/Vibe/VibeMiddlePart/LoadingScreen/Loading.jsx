import styles from "./Loading.module.css";
import vibeLoadingImg from "../../../../images/vibeLoadingImage.svg";

const Loading = () => {
    return <>
        <div className={styles.container}>
            <div className={styles.innerCont}>
                <img className={styles.loadingImg} src={vibeLoadingImg} alt="vibeLoadingImg" />
                <div className={styles.loadingCont}>
                    <h3 className={styles.loadingText} >Loading...</h3>
                    <p className={styles.subText}>Finding like-minded professionals...</p>
                </div>
            </div>
        </div>
    </>
}

export default Loading;
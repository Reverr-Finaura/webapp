import style from "./NotificationCard.module.css";
import profile from "../../images/notification-gurl.png";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({ item }) {
  console.log(item);
  const navigate = useNavigate();
  return (
    <div className={style.notificationCard}>
      <div className={style.notificationImg}>
        <img
          className={style.image}
          src={item.userData?.image}
          onClick={() => {
            navigate(`/userprofile/${item.userData?.email}`);
            window.scrollTo(0, 0);
          }}
        />
      </div>

      <div className={style.notificationContent}>
        <div className={style.upperPart}>
          <h3 className={style.heading}>{item.userData?.name}</h3>
          {/* <small className={style.date}>2 min ago</small> */}
        </div>
        <p className={style.para}>Liked Your Post</p>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./DiscoverPerfectTools.module.css";
import { useNavigate } from "react-router-dom";

function DiscoverPerfectTools({ isLoggedIn, openModal }) {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "StartUp Algo",
      image: require("../../../images/explore1.png"),
      route: "/start-up",
    },
    {
      title: "Pitch Deck",
      image: require("../../../images/peoplediscussion.png"),
      route: "/tools",
    },
    {
      title: "Document Templates",
      image: require("../../../images/explore.png"),
      route: "/tools",
    },
  ];

  return (
    <div className={styles.container} style={{ marginBottom: "3.2em" }}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Discover the </span>
          <span style={{ color: "#00B3FF" }}>&nbsp;perfect tools</span>
          <span style={{ color: "#ffffff" }}>&nbsp;for your startup !</span>
        </p>
        <span
          onClick={() => {
            if (!isLoggedIn) {
              return openModal();
            } else {
              navigate("/tools");
            }
          }}
        >
          See All
        </span>
      </div>
      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => {
              if (!isLoggedIn) {
                return openModal();
              } else {
                navigate(card.route);
              }
            }}
          >
            <img src={card.image} alt="img" />
            <div>
              <p style={{ fontSize: 12, color: "#ffffff" }}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

DiscoverPerfectTools.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default DiscoverPerfectTools;

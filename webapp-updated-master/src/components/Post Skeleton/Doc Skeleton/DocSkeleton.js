import React, { useEffect, useState } from "react";
import styles from "./DocSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DocSkeleton = ({ cards }) => {
  const [width, setWidth] = useState(window.innerWidth);
 useEffect(() => {
    setWidth(window.innerWidth)
  
  }, [window.innerWidth])
  
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <>
          <SkeletonTheme baseColor="#e6e4e4dc" highlightColor="grey">
            <div className={styles.card} key={index}>
              <div className={styles.cardTop}>
                <Skeleton
                  className={styles.cardTopUserImage}
                  width={`${width <= 450 ? 340 : 547 } `}
                  height={200}
                />
              </div>
              <div className={styles.cardBottomTop}>
                <Skeleton
                  count={1}
                  style={{ marginBottom: "1rem", width: "40%" }}
                />
              </div>
              <div className={styles.tagCont}>
                <div className={styles.tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "50%", height: "10px" }}
                  />
                </div>
                <div className={styles.tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "50%", height: "10px" }}
                  />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </>
      );
    });
};

export default DocSkeleton;

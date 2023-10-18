import React from "react";
import styles from "./MentorCardSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MentorCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <React.Fragment key={index}>
          <SkeletonTheme baseColor='rgb(0, 12, 31)' highlightColor='grey'>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <Skeleton
                  className={styles.cardTopUserImage}
                  width={360}
                  height={200}
                />
              </div>
              <div className={styles.cardBottomTop}>
                <Skeleton
                  count={2}
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
        </React.Fragment>
      );
    });
};

export default MentorCardSkeleton;

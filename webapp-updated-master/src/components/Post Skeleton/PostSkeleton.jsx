import React from "react";
import "./PostSkeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <React.Fragment key={index}>
          <SkeletonTheme baseColor='rgb(0, 12, 31)' highlightColor='#fff'>
            <div className='post-skeleton-card'>
              <div className='post-skeleton-card-top'>
                <div className='post-skeleton-card-top-userImage'>
                  <Skeleton circle width={40} height={40} />
                </div>
                <div className='post-skeleton-card-top-userName'>
                  <Skeleton />
                </div>
              </div>
              <div className='post-skeleton-card-middle'>
                <Skeleton count={4} style={{ marginBottom: "1rem" }} />
              </div>
            </div>

            <div className='post-skeleton-card-bottom'>
              <Skeleton count={2} style={{ marginBottom: "1rem" }} />
            </div>
          </SkeletonTheme>
        </React.Fragment>
      );
    });
};

export default PostSkeleton;

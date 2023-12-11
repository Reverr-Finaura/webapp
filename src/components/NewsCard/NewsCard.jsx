import "./NewsCard.css";
import React from "react";

const NewsCard = (props) => {
  return (
    <>
      <div className='news-box'>
        <div className='newsimg'>
          <img
            src={props.imgUrl}
            alt='newsImg'
            style={{ height: "110px", width: "110px" }}
          />
        </div>
        <div className='news-details'>
          <p className='newsdate'>{props.time}</p>
          <h4 style={{ color: "white" }}>{props.title}</h4>
          <div className='newslink'>
            <a
              href={props.url}
              style={{ color: "white", textDecoration: "none" }}
              target='_blank'
              rel='noreferrer'
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;

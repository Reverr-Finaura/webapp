// import React from 'react'
// import './ArticleDisplay.css'

// const ArticleDisplay = (props) => {
//   return (
//     <>
//     <div className='article-box'>
//       <img src={props.imgUrl} alt="Image" style={{height:'75px', width:'135px'}}/>
//         <div className='article-details'>
//           <p>{props.time}</p>
//           <h3 style={{color:'white'}}> {props.title}</h3>
//           <p>{props.source}</p>
//         </div>
//         <div >
//           <a classname='article-link' href="">Read More</a>
//         </div>

//     </div>
//   </>
//   )
// }

// export default ArticleDisplay

// import React from 'react'
// import './ArticleDisplay.css'

// const ArticleDisplay = (props) => {
//   return (
//     <>
//       <div className='article-box'>
//         <img src={props.imgUrl} alt="Image" className='article-image' />
//         <div className='article-details'>
//           <p>{props.time}</p>
//           <h3 className='article-heading' style={{ color: 'white' }}> {props.title}</h3>
//           <p>{props.description}</p>
//         </div>
//         <div>
//           <a className='article-link' href="">Read More</a>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ArticleDisplay

import React from "react";
import "./ArticleDisplay.css";

const ArticleDisplay = ({ description, title, articleImg }) => {
  console.log(description);
  // const htmlContent = description;

  // const extractText = (htmlString) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");
  //   const pElement = doc.querySelector("p");
  //   if (pElement) {
  //     const spanElement = doc.querySelector("span");
  //     if (spanElement) {
  //       return spanElement.textContent;
  //     } else {
  //       return pElement.textContent;
  //     }
  //   } else {
  //     return "no text";
  //   }
  // };

  // const extractImg = (htmlString) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");
  //   const imgElement = doc.querySelector("img");
  //   return imgElement ? imgElement.getAttribute("src") : null;
  // };
  // const imgSrc = extractImg(htmlContent);
  // const text = extractText(htmlContent);
  // console.log(text);
  const limitedDescription =
    description.length > 150 ? description.slice(0, 150) + "..." : description;

  return (
    <>
      <div className='article-box'>
        {articleImg !== null ? (
          <img
            src={articleImg.imageUrl}
            alt={articleImg.imageName}
            className='article-image'
          />
        ) : (
          ""
        )}
        <div className='article-details'>
          <h3 className='article-heading' style={{ color: "white" }}>
            {title}
          </h3>
          <p className='article-desc'>{limitedDescription}</p>
        </div>
        <div>{/* <a className='article-link' href="">Read More</a> */}</div>
      </div>
    </>
  );
};

export default ArticleDisplay;

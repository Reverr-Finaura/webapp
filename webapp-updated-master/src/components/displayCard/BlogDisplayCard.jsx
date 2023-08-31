import styles from "./blogdisplaycard.module.css";
import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../features/createBlogSlice";
import { deleteBlogInDatabse, deleteMedia } from "../../firebase";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const BlogDisplayCard = ({ data }) => {
  const { heading, body, author, id, publishedOn } = data;
  // const { imageName, imageUrl } = image;
  const dispatch = useDispatch();

  return (
    <div className={styles.Main_CardContainer}>
      {/* <div className={styles.Card_ImgContainer}>
        <img src={imageUrl} alt="blog-img" />
      </div> */}
      <div className={styles.Card_HeadingContainer}>
        <div className={styles.Card_Heading}>
          <h1>{heading}</h1>
        </div>
        <div className={styles.Card_Actions}>
          <h2>
            <Trash
              title="Click to delete"
              onClick={() => {
                console.log(id);
                deleteBlogInDatabse(id);
                dispatch(deleteBlog(id));
                // deleteMedia(imageName);
              }}
            />
          </h2>
        </div>
      </div>
      <div className={styles.Card_ContentContainer}>
        <p>
        <ReactQuill value={body} readOnly={true} theme={"bubble"} />
        </p>
        {/* <p>{body}</p> */}
      </div>
      <div className={styles.Card_CreditContainer}>
        <cite>
          {author} | {publishedOn}
        </cite>
      </div>
    </div>
  );
};

export default BlogDisplayCard;

import { useState } from "react";
// import { dateGenerator } from "../../../utils/dategenerator";
// import { uidGenerator } from "../../../utils/uidgenerator";
import {  uploadMedia } from "../../../firebase";
import styles from"./createblog.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dateGenerator = () => {
    const date = new Date();
    const newDate = date.toLocaleString("en-US", {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  
    return newDate;
  };
  
  const uidGenerator = (length = 20) => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";
    for (let i = 0; i < length; i++) {
      uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return uid;
  };

  
  

  const onAddPostHandler = async () => {
    setIsLoading(true);
    const img = await uploadMedia(imgFile, "Images/reverrBlogImages");
    let uid = uidGenerator();
    let publishedOn = dateGenerator();

    const blogData = {
      author: author,
      heading: title,
      body: textContent,
      image: { imageName: imgFile.name, imageUrl: img },
      publishedOn: publishedOn,
      id: uid,
    };
    // await addBlogInDatabase(uid, blogData);
    setIsLoading(false);
    setAuthor("");
    setTitle("");
    setTextContent("");
    toast.success("Post Added Successfully !", { position: "bottom-left" });
  };
  return (
    <>
      <div className={styles.Main_CreateBlog_Container}>
        <div className={styles.Blog_Form}>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="author"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />

          <input
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImgFile(e.target.files[0]);
              }
            }}
          />

          <button
            onClick={async () => {
              if (author && title && textContent) {
                onAddPostHandler();
              } else {
                toast.error("Fields can't be empty !", {
                  position: "bottom-left",
                });
              }
            }}
          >
            {isLoading ? "Uploading..." : " Add Post"}
          </button>
        </div>
        <div className={styles.Blog_TextContent}>
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Do not think ! Just write it "
            rows="18"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateBlog;

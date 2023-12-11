import React from "react";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.hc_textContainer}>
        <div className={styles.hc_heroText}>
          I'm a Tagline. Click here to add your own text and edit me.{" "}
        </div>

        <div className={styles.hc_heroSubtext}>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content
        </div>
        <button className={styles.hc_signUpButton}>Sign up to REVERR</button>
        <div className={styles.hc_scrollDownContainer}>
          <div className={styles.hac_scrollDownText}>
            <svg
              width='16'
              height='166'
              viewBox='0 0 16 166'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.29289 165.707C7.68342 166.098 8.31658 166.098 8.70711 165.707L15.0711 159.343C15.4616 158.953 15.4616 158.319 15.0711 157.929C14.6805 157.538 14.0474 157.538 13.6569 157.929L8 163.586L2.34315 157.929C1.95262 157.538 1.31946 157.538 0.928932 157.929C0.538408 158.319 0.538408 158.953 0.928932 159.343L7.29289 165.707ZM7 107L7 165H9L9 107H7Z'
                fill='white'
              />
              <path
                d='M14.112 87.232C14.112 87.968 13.984 88.6293 13.728 89.216C13.4613 89.792 13.0987 90.2453 12.64 90.576C12.1707 90.9067 11.632 91.0773 11.024 91.088V89.536C11.5467 89.4827 11.9893 89.2693 12.352 88.896C12.704 88.512 12.88 87.9573 12.88 87.232C12.88 86.5387 12.7093 85.9947 12.368 85.6C12.016 85.1947 11.568 84.992 11.024 84.992C10.5973 84.992 10.2507 85.1093 9.984 85.344C9.71733 85.5787 9.51467 85.872 9.376 86.224C9.23733 86.576 9.088 87.0507 8.928 87.648C8.736 88.384 8.544 88.976 8.352 89.424C8.16 89.8613 7.86133 90.24 7.456 90.56C7.04 90.8693 6.48533 91.024 5.792 91.024C5.184 91.024 4.64533 90.8693 4.176 90.56C3.70667 90.2507 3.344 89.8187 3.088 89.264C2.832 88.6987 2.704 88.0533 2.704 87.328C2.704 86.2827 2.96533 85.4293 3.488 84.768C4.01067 84.096 4.704 83.7173 5.568 83.632V85.232C5.14133 85.2853 4.768 85.5093 4.448 85.904C4.11733 86.2987 3.952 86.8213 3.952 87.472C3.952 88.08 4.112 88.576 4.432 88.96C4.74133 89.344 5.17867 89.536 5.744 89.536C6.14933 89.536 6.48 89.424 6.736 89.2C6.992 88.9653 7.18933 88.6827 7.328 88.352C7.456 88.0107 7.60533 87.536 7.776 86.928C7.97867 86.192 8.18133 85.6 8.384 85.152C8.576 84.704 8.88 84.32 9.296 84C9.70133 83.68 10.256 83.52 10.96 83.52C11.504 83.52 12.016 83.664 12.496 83.952C12.976 84.24 13.3653 84.6667 13.664 85.232C13.9627 85.7973 14.112 86.464 14.112 87.232ZM9.6 81.9214C8.69333 81.9214 7.904 81.74 7.232 81.3774C6.54933 81.0147 6.02133 80.5134 5.648 79.8734C5.27467 79.2227 5.088 78.4814 5.088 77.6494C5.088 76.572 5.34933 75.6867 5.872 74.9934C6.39467 74.2894 7.12 73.8254 8.048 73.6014V75.1694C7.51467 75.3187 7.09333 75.612 6.784 76.0494C6.47467 76.476 6.32 77.0094 6.32 77.6494C6.32 78.4814 6.608 79.1534 7.184 79.6654C7.74933 80.1774 8.55467 80.4334 9.6 80.4334C10.656 80.4334 11.472 80.1774 12.048 79.6654C12.624 79.1534 12.912 78.4814 12.912 77.6494C12.912 77.0094 12.7627 76.476 12.464 76.0494C12.1653 75.6227 11.7387 75.3294 11.184 75.1694V73.6014C12.08 73.836 12.8 74.3054 13.344 75.0094C13.8773 75.7134 14.144 76.5934 14.144 77.6494C14.144 78.4814 13.9573 79.2227 13.584 79.8734C13.2107 80.5134 12.6827 81.0147 12 81.3774C11.3173 81.74 10.5173 81.9214 9.6 81.9214ZM6.656 70.2026C6.15467 69.9466 5.76533 69.584 5.488 69.1146C5.21067 68.6346 5.072 68.0533 5.072 67.3706H6.576V67.7546C6.576 69.3866 7.46133 70.2026 9.232 70.2026H14V71.6586H5.232V70.2026H6.656ZM14.144 61.8659C14.144 62.6872 13.9573 63.4339 13.584 64.1059C13.2107 64.7672 12.6827 65.2899 12 65.6739C11.3067 66.0472 10.5067 66.2339 9.6 66.2339C8.704 66.2339 7.91467 66.0419 7.232 65.6579C6.53867 65.2632 6.01067 64.7299 5.648 64.0579C5.27467 63.3859 5.088 62.6339 5.088 61.8019C5.088 60.9699 5.27467 60.2179 5.648 59.5459C6.01067 58.8739 6.53333 58.3459 7.216 57.9619C7.89867 57.5672 8.69333 57.3699 9.6 57.3699C10.5067 57.3699 11.3067 57.5725 12 57.9779C12.6827 58.3725 13.2107 58.9112 13.584 59.5939C13.9573 60.2765 14.144 61.0339 14.144 61.8659ZM12.864 61.8659C12.864 61.3432 12.7413 60.8525 12.496 60.3939C12.2507 59.9352 11.8827 59.5672 11.392 59.2899C10.9013 59.0019 10.304 58.8579 9.6 58.8579C8.896 58.8579 8.29867 58.9965 7.808 59.2739C7.31733 59.5512 6.95467 59.9139 6.72 60.3619C6.47467 60.8099 6.352 61.2952 6.352 61.8179C6.352 62.3512 6.47467 62.8419 6.72 63.2899C6.95467 63.7272 7.31733 64.0792 7.808 64.3459C8.29867 64.6125 8.896 64.7459 9.6 64.7459C10.3147 64.7459 10.9173 64.6179 11.408 64.3619C11.8987 64.0952 12.2667 63.7432 12.512 63.3059C12.7467 62.8685 12.864 62.3885 12.864 61.8659ZM2.16 53.9995H14V55.4555H2.16V53.9995ZM2.16 50.062H14V51.518H2.16V50.062ZM2.848 39.8429C2.848 38.6269 3.07733 37.5762 3.536 36.6909C3.984 35.7949 4.62933 35.1122 5.472 34.6429C6.31467 34.1629 7.30667 33.9229 8.448 33.9229C9.58933 33.9229 10.5813 34.1629 11.424 34.6429C12.256 35.1122 12.896 35.7949 13.344 36.6909C13.7813 37.5762 14 38.6269 14 39.8429V43.3149H2.848L2.848 39.8429ZM12.8 39.8429C12.8 38.4029 12.4213 37.3042 11.664 36.5469C10.896 35.7895 9.824 35.4109 8.448 35.4109C7.06133 35.4109 5.97867 35.7949 5.2 36.5629C4.42133 37.3202 4.032 38.4135 4.032 39.8429V41.8589H12.8V39.8429ZM14.144 28.1784C14.144 28.9997 13.9573 29.7464 13.584 30.4184C13.2107 31.0797 12.6827 31.6024 12 31.9864C11.3067 32.3597 10.5067 32.5464 9.6 32.5464C8.704 32.5464 7.91467 32.3544 7.232 31.9704C6.53867 31.5757 6.01067 31.0424 5.648 30.3704C5.27467 29.6984 5.088 28.9464 5.088 28.1144C5.088 27.2824 5.27467 26.5304 5.648 25.8584C6.01067 25.1864 6.53333 24.6584 7.216 24.2744C7.89867 23.8797 8.69333 23.6824 9.6 23.6824C10.5067 23.6824 11.3067 23.885 12 24.2904C12.6827 24.685 13.2107 25.2237 13.584 25.9064C13.9573 26.589 14.144 27.3464 14.144 28.1784ZM12.864 28.1784C12.864 27.6557 12.7413 27.165 12.496 26.7064C12.2507 26.2477 11.8827 25.8797 11.392 25.6024C10.9013 25.3144 10.304 25.1704 9.6 25.1704C8.896 25.1704 8.29867 25.309 7.808 25.5864C7.31733 25.8637 6.95467 26.2264 6.72 26.6744C6.47467 27.1224 6.352 27.6077 6.352 28.1304C6.352 28.6637 6.47467 29.1544 6.72 29.6024C6.95467 30.0397 7.31733 30.3917 7.808 30.6584C8.29867 30.925 8.896 31.0584 9.6 31.0584C10.3147 31.0584 10.9173 30.9304 11.408 30.6744C11.8987 30.4077 12.2667 30.0557 12.512 29.6184C12.7467 29.181 12.864 28.701 12.864 28.1784ZM5.232 10.088L14 12.824V14.328L7.04 16.44L14 18.552V20.056L5.232 22.808V21.32L12.592 19.304L5.232 17.128V15.64L12.608 13.512L5.232 11.528V10.088ZM5.072 4.371C5.072 3.30433 5.39733 2.44033 6.048 1.779C6.688 1.11767 7.616 0.787 8.832 0.787H14V2.227H9.04C8.16533 2.227 7.49867 2.44567 7.04 2.883C6.57067 3.32033 6.336 3.91767 6.336 4.675C6.336 5.443 6.576 6.05633 7.056 6.515C7.536 6.963 8.23467 7.187 9.152 7.187H14V8.643H5.232V7.187H6.48C6.032 6.899 5.68533 6.50967 5.44 6.019C5.19467 5.51767 5.072 4.96833 5.072 4.371Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.hc_imageContainer}>
        <div>
          <img
            src='/images/hero-image.svg'
            className={styles.hc_heroImage}
            alt=''
          />
        </div>
        <div className={styles.hc_logoContainer}>
          <div className={styles.heroImage}>
            <img src='/images/hero-unicorn-logo.svg' alt='' />
            <p className={styles.hc_imStartUp}>I'm a Start-up</p>
          </div>
          <div className={styles.heroImage}>
            <img src='/images/hero-antler-logo.svg' alt='' />
            <p className={styles.hc_imStartUp}>I'm a Start-up</p>
          </div>
          <div className={styles.heroImage}>
            <img src='/images/hero-hair-logo.svg' alt='' />
            <p className={styles.hc_imStartUp}>I'm a Start-up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

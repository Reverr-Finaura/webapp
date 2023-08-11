import React from 'react'
import styles from './LikesExhaustScreen.module.css'
import curvearrow from '../../../../images/curvedArrow.svg'
import likesImage from '../../../../images/nomorelikes.png'

const LikesExhaust=()=>{
    return (
        <>
        <section className={styles.outerCont}>
            <div className={styles.topWrapper}>
                <div className={styles.wrapperAr}>
                <img src={curvearrow} alt='img' />
                </div>
            </div>


            <div className={styles.img}>
                <img src={likesImage} alt="img" />

            </div>
            <div className={styles.content}>
                <div className={styles.heading}>No more likes</div>
                <div className={styles.text}>You’ve exhausted your daily limit of 10 Profile Likes</div>
            </div>
            <div className={styles.button}>Upgrade to premium</div>
        
        </section>
        </>
    )
}

export default LikesExhaust
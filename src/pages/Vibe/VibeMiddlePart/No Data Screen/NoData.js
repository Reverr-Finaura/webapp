import React from 'react';
import styles from './NoData.module.css'
import curveArr from '../../../../images/curvedArrow.svg'
import NoDataImg from '../../../../images/NoDataImg.png'

const NoData=({noMoreVibeData})=>{
    return (
        <>
        <section style={{ overflowY: noMoreVibeData ? "hidden" : "scroll" }} className={styles.outerCont}>
            <div className={styles.imgOuter}>
                <img src={NoDataImg} alt='img' />

            </div>
            <div className={styles.content}>
                <div className={styles.heading}>UH-OH</div>
                <div className={styles.text}>Sorry, we couldn’t find any more data to show</div>
            </div>
        </section>
        </>
    )
}

export default NoData;
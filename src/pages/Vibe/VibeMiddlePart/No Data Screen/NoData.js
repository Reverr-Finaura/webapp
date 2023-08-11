import React from 'react';
import styles from './NoData.module.css'
import curveArr from '../../../../images/curvedArrow.svg'
import NoDataImg from '../../../../images/NoDataImg.png'

const NoData=({noMoreVibeData,matches, handleRefresh})=>{
    return (
        <>
        <section style={{ overflowY: noMoreVibeData || !matches ? "hidden" : "scroll" }} className={styles.outerCont}>
            <div className={styles.imgOuter}>
                <img src={NoDataImg} alt='img' />

            </div>
            <div className={styles.content}>
                <div className={styles.heading}>UH-OH</div>
                <div className={styles.text}>Sorry, we couldn’t find any more data to show</div>
                <button className={styles.refreshBtn} onClick={handleRefresh}>Refresh</button>
            </div>
        </section>
        </>
    )
}

export default NoData;
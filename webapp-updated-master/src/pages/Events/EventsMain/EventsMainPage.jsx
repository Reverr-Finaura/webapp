import React, { useState } from "react";
import styles from "./EventsMainPage.module.css";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import eventsBannerImg from "../../../images/eventsBannerImg.svg";
import eventsDateIcon from "../../../images/eventsDateIcon.svg";
import eventsTypeIcon from "../../../images/eventsTypeIcon.svg";


const data = {
    bannerImg: eventsBannerImg,
    about: "Code with Node 2.0 brings you an amazing teaching-learning event, with web development being the topic of discussion with special emphasis on Node JS.  With projects and activities helping you learn better, our trainers are well equipped to tackle all your WebDev' queries'. ",
    dateIcon: eventsDateIcon,
    date: "5th March, 2023",
    typeIcon: eventsTypeIcon,
    type: "Workshop",
    mode: "online",
    technologies: ["NodeJS", "Backend", "ExpressJS"],
    timelineDays: ["Day 1", "Day 2"],
    timeline: {
        day1: [{
                timestamp : "09:00am",
                title: "Introduction of speakers & guests",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            timestamp : "09:30am",
            title: "First lecture by speaker 1 on topic 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            timestamp : "11:30am",
            title: "Snack–Break",
        },
        {
            timestamp : "11:40am",
            title: "Second lecture by speaker 1 on topic 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            timestamp : "12:30pm",
            title: "Lunch break",
        },
        {
            timestamp : "01:30pm",
            title: "Third lecture by speaker 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            timestamp : "03:30pm",
            title: "Closing remarks",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
    ],
        day2: [],
    },
    location: {}
}





const EventsMainPage = () => {

    const [activeDay, setActiveDay] = useState(data.timelineDays[0])
    return (<>
    <NavBarFinalDarkMode />
    <section className={styles.mainContainer}>
        <div className={styles.bannerCont}>
            <img className={styles.bannerImg} src={data.bannerImg} alt="bannerImg" />
        </div>
        <div className={styles.aboutEvent}>
            <div className={styles.header}>
                <h1 className={styles.heading}>About the Event</h1>
                <button className={styles.attendNow}>Attend Now</button>
            </div>
            <div className={styles.aboutInfo}>
                <p className={styles.aboutText}>{data.about}</p>
                <div className={styles.dateCont}>
                    <img src={data.dateIcon} alt="dateIcon" />
                    <p className={styles.dateText}>{data.date}</p>
                </div>
                <div className={styles.typeCont}>
                    <img src={data.typeIcon} alt="typeIcon" />
                    <p className={styles.typeText}>{data.type}</p>
                </div>
                <div className={styles.modeCont}>
                    <span className={styles.mode}>{data.mode}</span>
                </div>
                <div className={styles.technologiesCont}>
                    {data.technologies.map((tech) => {
                        return (<div className={styles.tech}>
                            <span className={styles.techTxt}>{tech}</span>
                        </div>)
                    })}
                </div>
            </div>
        </div>
        <div className={styles.timelineMain}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Timeline</h1>
            </div>
            <div className={styles.daysCont}>
                    <div className={styles.days}>
                        {data.timelineDays.map((day) => {
                            return (
                                <div 
                                    key={day} 
                                    className={day === activeDay ? styles.activeDay : styles.day}
                                    onClick={() => setActiveDay(day)}
                                    >
                                    <span className={styles.dayText}>{day}</span>
                                </div>)})}
                    </div>
            </div>
            {activeDay === "Day 1" && (
                <div className={styles.timeLineCont}>
                    {data.timeline.day1.map((section, index) => {
                        const lastSection = index === data.timeline.day1.length - 1;
                        return (
                            <div key={index} className={styles.sectionCont}>
                                <div className={styles.timeStamp}>
                                    <span className={styles.time}>{section.timestamp}</span>
                                </div>
                                <div className={styles.lineCont}>
                                    <div className={styles.roundPoint}>

                                    </div>
                                    {lastSection ? null : <div className={styles.line}></div>}
                                </div>
                                <div className={styles.timelineDetails}>
                                    <p className={styles.title}>{section.title}</p>
                                    <p className={styles.description}>{section.description}</p>
                                </div>
                            </div>)
                    })}
                </div>
            )}
        </div>
        <div className={styles.locationMain}>

        </div>
    </section>
    </>)
}

export default EventsMainPage;
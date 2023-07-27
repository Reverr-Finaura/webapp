import React from 'react'
import styles from "./UserTitleCont.module.css"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedUser,Chatshow } from '../../../features/chatSlice_latest'

const UserTitleCont = () => {
  const chatData = useSelector((state) => state.chatLatest)
  const dispatch = useDispatch()

  return (
    <section className={styles.outerCont}>
      <img className={styles.userImg} src={chatData.selectedUser.userImg} alt="userImg" />

      <div className={styles.userNameNStatus}>
        <h3 className={styles.userName}>{chatData.selectedUser.name}</h3>
        {/* <p className={styles.userStatus}>Online</p> */}
      </div>

      <BiDotsVerticalRounded className={styles.infoIcon} />
      <AiOutlineClose onClick={() => {
        dispatch(updateSelectedUser(null))
        dispatch(Chatshow())
      }} />
    </section>
  )
}

export default UserTitleCont
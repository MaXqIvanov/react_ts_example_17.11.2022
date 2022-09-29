import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../scss/AdminEmployes.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import camera_img from '../../assets/camera_img.svg';

export const SideBar = ({setIsVisibleSideBar, isvisible_sidebaer}:any) => {
  const [position, setPosition] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const {user} = useSelector((state:RootState)=> state.auth)
  return (
    <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleSideBar(!isvisible_sidebaer)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.text_field_block}>
            <div className={styles.group_img_user}>
              <div style={{backgroundImage: `url(${user.profile_img})`}} className={styles.img_user}></div>
              <div style={{backgroundImage: `url(${camera_img})`}} className={styles.img_user_added_photo}></div>
            </div>
              <TextField
                className={`${styles.text_field}`}
                label="ФИО"
                InputProps={{
                  type: 'string',
                }}
              />
              <TextField
                className={`${styles.text_field}`}
                label="Должность"
                InputProps={{
                  type: 'string',
                }}
              />
              <TextField
                className={`${styles.text_field}`}
                label="Новый пароль"
                InputProps={{
                  type: 'password',
                }}
              />
              <TextField
                className={`${styles.text_field}`}
                label="Повторить пароль"
                InputProps={{
                  type: 'password',
                }}
              />
            </div>
            <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_delete_side_bar}><span>УДАЛИТЬ</span></div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        <div onClick={()=> setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}

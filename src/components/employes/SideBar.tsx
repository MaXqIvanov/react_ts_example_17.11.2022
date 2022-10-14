import { TextField } from '@mui/material'
import React from 'react'
import styles from '../../scss/Employes.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { NavHeader } from '../tasks/NavHeader';
import { TableHeader } from '../tasks/TableHeader';
import { TasksPage } from '../../pages/TasksPage';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';

export const SideBar = ({setIsVisibleSideBar, isvisible_sidebaer}:any) => {
  const visible = true
  const dispatch = useAppDispatch()
  return (
    <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleSideBar(!isvisible_sidebaer)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.added_task_btn_wrapper}>
              {/* <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.added_task_btn}>
                ДОБАВИТЬ ЗАДАЧУ  
              </div> */}
            </div>
            <TasksPage visible={visible}/>
          </div>
        </div>
        <div onClick={()=> setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}

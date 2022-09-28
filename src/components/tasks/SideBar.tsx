import { TextField } from '@mui/material'
import React from 'react'
import styles from '../../scss/Task.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'

export const SideBar = ({setIsVisibleSideBar, isvisible_sidebaer}:any) => {
  return (
    <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleSideBar(!isvisible_sidebaer)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.text_field_block}>
                <div className={styles.task_title}>Задача</div>
                <div className={styles.current_task}>Выполнение контроля открытия магазина</div>
                <div className={styles.task_begining_title}>Начало до</div>
                <div className={styles.task_begining}>10:00</div>
                <div className={styles.task_begining_title}>Переодичность</div>
                <div className={styles.task_periodicity}>Кажд. 2 нед. -вторник, пятница, до 02.12.2022</div>
                <div className={styles.task_begining_title}>Отчёт/артефакт</div>
                <div className={styles.task_reports}>
                    <a href='https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0'>
                        https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0
                    </a>
                </div>
                <div className={styles.task_begining_title}>Норма (минуты)</div>
                <div className={styles.task_norma}>10</div>
                <div className={styles.task_begining_title}>Комментарий</div>
                <div className={styles.task_comment}>Открытие и закрытие магазина должно проводиться в соответствии с установленным регламентом по пункту 6.6.6 ст. 13</div>
              <TextField
                value={'10'}
                className={`${styles.text_field}`}
                label="Затрачено времени (минуты)"
                InputProps={{
                  type: 'string',
                }}
              />
              <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_cancel_side_bar}>ЗАКРЫТЬ</div>
                  <div className={styles.btn_save_side_bar}><span>ЗАВЕРШИТЬ</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={()=> setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}

import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../scss/Task.module.scss';
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar, finishTask } from '../../store/taskSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const { current_task_week } = useSelector((state: RootState) => state.task);
  const [spend_time, setSpendTime] = useState<string>('');
  const completeTask = () => {
    if (spend_time?.length > 0) {
      dispatch(
        finishTask({
          time_spent: spend_time,
        })
      );
    } else {
      alert('Затрачено минут обязательное поле');
    }
  };
  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div className={styles.side_menu_header}>
            <span>{current_task_week.name}</span>
            <div
              onClick={() => dispatch(changeVisibleSideBar())}
              className={styles.btn_close}
            ></div>
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Начало до</div>
            <input disabled value={current_task_week.start_before} />
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Переодичность</div>
            <input disabled value={current_task_week.start_before} />
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Отчет/Артефакт</div>
            <div className={'artefact'}>
              <a href={current_task_week.artefact}>{current_task_week.artefact}</a>
            </div>
          </div>
          <div className={'wrapper_input_two_btn'}>
            <div style={{ marginTop: '20px', marginLeft: '20px' }} className={'wrapper_input'}>
              <div className={'label'}>Норма</div>
              <input disabled value={current_task_week.norm} />
            </div>
            <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
              <div className={'label'}>Затрачено минут</div>
              <input
                type={'number'}
                onChange={(e) => setSpendTime(e.target.value)}
                value={spend_time}
              />
            </div>
          </div>
          <div className={'custom_btn_wrapper'}>
            <div onClick={() => dispatch(changeVisibleSideBar())} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div onClick={() => completeTask()} className={'btn_complete'}>
              <span>ЗАВЕРШИТЬ</span>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(changeVisibleSideBar())}
        className={styles.user_side_menu_plug}
      ></div>
    </>
  );
};
// ?? was earlier
{
  /* <div onClick={()=> dispatch(changeVisibleSideBar())} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
<div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
<div className={styles.text_field_block}>
    <div className={styles.task_title}>Задача</div>
    <div className={styles.current_task}>Выполнение контроля открытия магазина</div>
    <div className={styles.task_begining_title}>Начало до</div>
    <div className={styles.task_begining}>10:00</div>
    <div className={styles.task_begining_title}>Переодичность</div>
    <div className={`${styles.task_periodicity} min-width`}>Кажд. 2 нед. -вторник, пятница, до 02.12.2022</div>
    <div className={styles.task_begining_title}>Отчёт/артефакт</div>
    <div className={`${styles.task_reports} min-width`}>
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
</div>
<div className={styles.group_btn_side_bar}>
    <div className={styles.group_btn_side_bar_save_close}>
      <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.btn_cancel_side_bar}><span>ЗАКРЫТЬ</span></div>
      <div className={styles.btn_save_side_bar}><span>ЗАВЕРШИТЬ</span></div>
    </div>
</div> */
}

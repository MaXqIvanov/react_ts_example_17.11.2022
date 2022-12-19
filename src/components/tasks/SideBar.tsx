import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../scss/Task.module.scss';
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/reducers/tasks/taskSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { finishTask } from '../../store/reducers/tasks/ActionSlice';

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

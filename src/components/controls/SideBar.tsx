import React from 'react';
import styles from '../../scss/Controls.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/reducers/control/controlSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { taskApprove, taskReject } from '../../store/reducers/control/ActionControl';

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const { controls_task_current } = useSelector((state: RootState) => state.control);

  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div className={styles.side_menu_header}>
            <span>{controls_task_current._task.name}</span>
            <div
              onClick={() => dispatch(changeVisibleSideBar())}
              className={styles.btn_close}
            ></div>
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Начало до</div>
            <input disabled value={controls_task_current._task.start_before} />
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Переодичность</div>
            <input disabled value={controls_task_current.start_before} />
          </div>
          <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
            <div className={'label'}>Отчет/Артефакт</div>
            <div className={'artefact'}>
              <a href={controls_task_current._task.artefact}>
                {controls_task_current._task.artefact}
              </a>
            </div>
          </div>
          <div className={'wrapper_input_two_btn'}>
            <div style={{ marginTop: '20px', marginLeft: '20px' }} className={'wrapper_input'}>
              <div className={'label'}>Норма</div>
              <input disabled value={controls_task_current._task.norm} />
            </div>
            <div style={{ marginTop: '20px' }} className={'wrapper_input'}>
              <div className={'label'}>Затрачено минут</div>
              <input disabled type={'number'} value={controls_task_current.time_spent} />
            </div>
          </div>
          <div className={'custom_btn_wrapper'}>
            <div onClick={() => dispatch(changeVisibleSideBar())} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div
              style={{ marginRight: '10px' }}
              onClick={() => dispatch(taskReject())}
              className={'btn_mistake'}
            >
              <span>есть ошибки</span>
            </div>
            <div onClick={() => dispatch(taskApprove())} className={'btn_good'}>
              <span>все хорошо</span>
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

import React from 'react';
import styles from '../../scss/Employes.module.scss';
import close_btn from '../../assets/close_btn.svg';
import { TasksPage } from '../../pages/TasksPage';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/reducers/tasks/taskSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const SideBar = ({ setIsVisibleSideBar, isvisible_sidebaer }: any) => {
  const visible = true;
  const dispatch = useAppDispatch();
  const { employes_current } = useSelector((state: RootState) => state.employes);
  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div
            onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)}
            style={{ backgroundImage: `url(${close_btn})` }}
            className={styles.close_user_side_menu_btn}
          ></div>
          <div className={styles.sidebar_header_employes}>
            <div className={styles.header_employes_name}>
              Задачи {employes_current?._user?.name}
            </div>
            {visible && (
              <div
                onClick={() => dispatch(changeVisibleSideBar())}
                className={styles.added_task_btn}
              >
                <span>ДОБАВИТЬ ЗАДАЧУ + </span>
              </div>
            )}
          </div>
          <TasksPage visible={visible} />
        </div>
      </div>
      <div onClick={() => setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};

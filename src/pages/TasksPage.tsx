import { LinearProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CreateSideBar } from '../components/tasks/CreateSideBar'
import { EditSideBarEmployesTask } from '../components/tasks/EditSideBarEmployesTask'
import { NavHeader } from '../components/tasks/NavHeader'
import { SideBar } from '../components/tasks/SideBar'
import { TableHeader } from '../components/tasks/TableHeader'
import styles from '../scss/Task.module.scss'
import { RootState } from '../store/store'

export const TasksPage = ({visible}:any) => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const {isVisibleSideBar, loading} = useSelector((state:RootState)=> state.task)
  const {isVisibleSideBarCreate} = useSelector((state:RootState)=> state.employes)
  const [current_day_task, setCurrentDayTask] = useState('Вт, 13 сен 3.0')
  return (
    <div className={visible ? styles.task_employes : styles.task}>
      {loading && !visible && <LinearProgress className={`linear_progress`}/>}
      <div className={styles.task_wrapper}>
        <NavHeader visible={visible} setCurrentDayTask={setCurrentDayTask}/>
        <TableHeader visible={visible} current_day_task={current_day_task}/>
        {!isVisibleSideBarCreate && isVisibleSideBar ? visible ?
        <CreateSideBar />
        :
        <SideBar />
        :<></>}
        {
          isVisibleSideBarCreate && visible &&
          <EditSideBarEmployesTask />
        }
      </div>
    </div>
  )
}

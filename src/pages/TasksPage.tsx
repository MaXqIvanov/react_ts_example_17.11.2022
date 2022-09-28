import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { NavHeader } from '../components/tasks/NavHeader'
import { SideBar } from '../components/tasks/SideBar'
import { TableHeader } from '../components/tasks/TableHeader'
import styles from '../scss/Task.module.scss'

export const TasksPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  return (
    <div className={styles.task}>
      <div className={styles.task_wrapper}>
        <NavHeader />
        <TableHeader setIsVisibleSideBar={setIsVisibleSideBar}/>
        {isvisible_sidebaer &&
        <SideBar setIsVisibleSideBar={setIsVisibleSideBar} isvisible_sidebaer={isvisible_sidebaer}/>
        }
      </div>
    </div>
  )
}

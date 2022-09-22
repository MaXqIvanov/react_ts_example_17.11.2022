import React from 'react'
import { NavHeader } from '../components/tasks/NavHeader'
import styles from '../scss/Task.module.scss'

export const TasksPage = () => {
  return (
    <div className={styles.task}>
      <div className={styles.task_wrapper}>
        <NavHeader />
      </div>
    </div>
  )
}

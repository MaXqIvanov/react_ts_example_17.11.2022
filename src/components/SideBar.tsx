import React from 'react'
import styles from '../scss/Component.module.scss'

export const SideBar = () => {
    const sidebar_navigation_main = [
        {
            id: 1,
            title: 'ЗАДАЧИ',
            image: ''
        },
        {
            id: 2,
            title: 'КОНТРОЛЬ',
            image: ''
        },
        {
            id: 3,
            title: 'СОТРУДНИКИ',
            image: ''
        }
    ]
    const sidebar_navigation_company = [
        {
            id: 4,
            title: 'СОТРУДНИКИ',
            image: ''
        },
        {
            id: 5,
            title: 'ДОЛЖНОСТИ',
            image: ''
        }
    ]
    const sidebar_navigation_admin = [
        {
            id: 6,
            title: 'КОМПАНИИ',
            image: ''
        },
        {
            id: 7,
            title: 'СОТРУДНИКИ',
            image: ''
        }
    ]
    const current_navigation_elem = 1
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar_wrapper}>
            {sidebar_navigation_main && sidebar_navigation_main.map((elem:any)=> <div className={styles.navigation_main}>
                {elem}
            </div>)}
        </div>
    </div>
  )
}

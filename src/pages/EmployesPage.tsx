import React, { useState } from 'react'
import { NavHeaderEmployes } from '../components/employes/NavHeaderEmployes'
import { SideBar } from '../components/employes/SideBar'
import { TableHeaderEmployes } from '../components/employes/TableHeaderEmployes'
import styles from '../scss/Employes.module.scss'

export const EmployesPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  return (
    <div className={styles.employes}>
      <div className={styles.employes_wrapper}>
        <NavHeaderEmployes />
        <TableHeaderEmployes setIsVisibleSideBar={setIsVisibleSideBar}/>
        {isvisible_sidebaer &&
          <SideBar setIsVisibleSideBar={setIsVisibleSideBar} isvisible_sidebaer={isvisible_sidebaer}/>
        }
      </div>
  </div>
  )
}

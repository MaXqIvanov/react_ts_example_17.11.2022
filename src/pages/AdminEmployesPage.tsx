import React, { useState } from 'react'
import { AddedSideBar } from '../components/admin_employes/AddedSideBar'
import { NavHeaderAdmEmployes } from '../components/admin_employes/NavHeaderAdmEmployes'
import { SideBar } from '../components/admin_employes/SideBar'
import { TableHeaderAdmEmployes } from '../components/admin_employes/TableHeaderAdmEmployes'
import styles from '../scss/AdminEmployes.module.scss'

export const AdminEmployesPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  return (
    <div className={styles.admin_employes}>
        <div className={styles.admin_employes_wrapper}>
          <NavHeaderAdmEmployes setIsAddedSideBar={setIsAddedSideBar}/>
          <TableHeaderAdmEmployes setIsVisibleSideBar={setIsVisibleSideBar}/>
          {isvisible_sidebaer &&
         <SideBar setIsVisibleSideBar={setIsVisibleSideBar} isvisible_sidebaer={isvisible_sidebaer}/>
          }
          {isadded_sidebar &&
          <AddedSideBar setIsAddedSideBar={setIsAddedSideBar} isadded_sidebar={isadded_sidebar}/>
          }
        </div>
    </div>
  )
}

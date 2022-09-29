import React, { useState } from 'react'
import { AddedSideBar } from '../components/company_employes/AddedSideBar'
import { NavHeaderComEmployes } from '../components/company_employes/NavHeaderComEmployes'
import { SideBar } from '../components/company_employes/SideBar'
import { TableHeaderComEmployes } from '../components/company_employes/TableHeaderComEmployes'
import styles from '../scss/CompanyEmployes.module.scss'

export const CompanyEmployesPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  return (
    <div className={styles.company_employes}>
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComEmployes setIsAddedSideBar={setIsAddedSideBar} />
        <TableHeaderComEmployes setIsVisibleSideBar={setIsVisibleSideBar}/>
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

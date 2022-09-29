import React, { useState } from 'react'
import { AddedSideBar } from '../components/company_positions/AddedSideBar'
import { NavHeaderComPosition } from '../components/company_positions/NavHeaderComPosition'
import { SideBar } from '../components/company_positions/SideBar'
import { TableHeaderComPosition } from '../components/company_positions/TableHeaderComPosition'
import styles from '../scss/CompanyPosition.module.scss'

export const CompanyPositionsPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  return (
    <div className={styles.company_employes}>
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComPosition setIsAddedSideBar={setIsAddedSideBar}/>
        <TableHeaderComPosition setIsVisibleSideBar={setIsVisibleSideBar}/>
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

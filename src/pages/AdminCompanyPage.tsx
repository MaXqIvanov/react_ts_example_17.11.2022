import React, { useState } from 'react'
import { AddedSideBar } from '../components/admin_company/AddedSideBar'
import { NavHeaderAdmCompany } from '../components/admin_company/NavHeaderAdmCompany'
import { SideBar } from '../components/admin_company/SideBar'
import { TableHeaderAdmCompany } from '../components/admin_company/TableHeaderAdmCompany'
import styles from '../scss/AdminCompany.module.scss'

export const AdminCompanyPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  return (
    <div className={styles.admin_company}>
      <div className={styles.admin_company_wrapper}>
        <NavHeaderAdmCompany setIsAddedSideBar={setIsAddedSideBar}/>
        <TableHeaderAdmCompany setIsVisibleSideBar={setIsVisibleSideBar}/>
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

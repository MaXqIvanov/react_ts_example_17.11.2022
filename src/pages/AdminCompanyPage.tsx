import { LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddedSideBar } from '../components/admin_company/AddedSideBar'
import { NavHeaderAdmCompany } from '../components/admin_company/NavHeaderAdmCompany'
import { SideBar } from '../components/admin_company/SideBar'
import { TableHeaderAdmCompany } from '../components/admin_company/TableHeaderAdmCompany'
import styles from '../scss/AdminCompany.module.scss'
import { RootState } from '../store/store'

export const AdminCompanyPage = ({isCollapseSideBar}:any) => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  const {loading} = useSelector((state: RootState)=> state.company)
  
  return (
    <div className={styles.admin_company}>
      {loading && <LinearProgress className={isCollapseSideBar ? 'linear_progress_collapse' :`linear_progress`}/>}
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

import { LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddedSideBar } from '../components/admin_employes/AddedSideBar'
import { NavHeaderAdmEmployes } from '../components/admin_employes/NavHeaderAdmEmployes'
import { SideBar } from '../components/admin_employes/SideBar'
import { TableHeaderAdmEmployes } from '../components/admin_employes/TableHeaderAdmEmployes'
import styles from '../scss/AdminEmployes.module.scss'
import { RootState } from '../store/store'

export const AdminEmployesPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false)
  const {loading} = useSelector((state: RootState)=> state.employes)
  
  return (
    <div className={styles.admin_employes}>
        {loading && <LinearProgress className={`linear_progress`}/>}
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

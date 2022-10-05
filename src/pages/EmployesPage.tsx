import { LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavHeaderEmployes } from '../components/employes/NavHeaderEmployes'
import { SideBar } from '../components/employes/SideBar'
import { TableHeaderEmployes } from '../components/employes/TableHeaderEmployes'
import styles from '../scss/Employes.module.scss'
import { RootState } from '../store/store'

export const EmployesPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const {loading} = useSelector((state:RootState)=> state.employes)
  return (
    <div className={styles.employes}>
      {loading && <LinearProgress className={`linear_progress`}/>}
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

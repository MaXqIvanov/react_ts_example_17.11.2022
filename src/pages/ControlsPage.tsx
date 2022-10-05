import { LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavHeaderControls } from '../components/controls/NavHeaderControls'
import { SideBar } from '../components/controls/SideBar'
import { TableHeaderControls } from '../components/controls/TableHeaderControls'
import styles from '../scss/Controls.module.scss'
import { RootState } from '../store/store'

export const ControlsPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  const {loading} = useSelector((state:RootState)=> state.control)
  
  return (
    <div className={styles.controls}>
        {loading && <LinearProgress className={`linear_progress`}/>}
        <div className={styles.controls_wrapper}>
          <NavHeaderControls />
          <TableHeaderControls setIsVisibleSideBar={setIsVisibleSideBar}/>
          {isvisible_sidebaer &&
            <SideBar setIsVisibleSideBar={setIsVisibleSideBar} isvisible_sidebaer={isvisible_sidebaer}/>
          }
        </div>
    </div>
  )
}

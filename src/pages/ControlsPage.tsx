import { LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavHeaderControls } from '../components/controls/NavHeaderControls'
import { SideBar } from '../components/controls/SideBar'
import { TableHeaderControls } from '../components/controls/TableHeaderControls'
import styles from '../scss/Controls.module.scss'
import { RootState } from '../store/store'

export const ControlsPage = () => {
  const {loading, isVisibleSideBar} = useSelector((state:RootState)=> state.control)
  
  return (
    <div className={styles.controls}>
        {loading && <LinearProgress className={`linear_progress`}/>}
        <div className={styles.controls_wrapper}>
          <NavHeaderControls />
          <TableHeaderControls/>
          {isVisibleSideBar &&
            <SideBar />
          }
        </div>
    </div>
  )
}

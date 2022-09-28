import React, { useState } from 'react'
import { NavHeaderControls } from '../components/controls/NavHeaderControls'
import { SideBar } from '../components/controls/SideBar'
import { TableHeaderControls } from '../components/controls/TableHeaderControls'
import styles from '../scss/Controls.module.scss'

export const ControlsPage = () => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false)
  return (
    <div className={styles.controls}>
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

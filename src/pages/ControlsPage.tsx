import React from 'react'
import { NavHeaderControls } from '../components/controls/NavHeaderControls'
import { TableHeaderControls } from '../components/controls/TableHeaderControls'
import styles from '../scss/Controls.module.scss'

export const ControlsPage = () => {
  return (
    <div className={styles.controls}>
        <div className={styles.controls_wrapper}>
          <NavHeaderControls />
          <TableHeaderControls />
        </div>
    </div>
  )
}

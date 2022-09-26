import React from 'react'
import { NavHeaderEmployes } from '../components/employes/NavHeaderEmployes'
import { TableHeaderEmployes } from '../components/employes/TableHeaderEmployes'
import styles from '../scss/Employes.module.scss'

export const EmployesPage = () => {
  return (
    <div className={styles.employes}>
      <div className={styles.employes_wrapper}>
        <NavHeaderEmployes />
        <TableHeaderEmployes />
      </div>
  </div>
  )
}

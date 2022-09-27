import React from 'react'
import { NavHeaderAdmEmployes } from '../components/admin_employes/NavHeaderAdmEmployes'
import { TableHeaderAdmEmployes } from '../components/admin_employes/TableHeaderAdmEmployes'
import styles from '../scss/AdminEmployes.module.scss'

export const AdminEmployesPage = () => {
  return (
    <div className={styles.admin_employes}>
        <div className={styles.admin_employes_wrapper}>
          <NavHeaderAdmEmployes />
          <TableHeaderAdmEmployes />
        </div>
    </div>
  )
}

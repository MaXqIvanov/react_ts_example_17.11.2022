import React from 'react'
import { NavHeaderComPosition } from '../components/company_positions/NavHeaderComPosition'
import { TableHeaderComPosition } from '../components/company_positions/TableHeaderComPosition'
import styles from '../scss/CompanyPosition.module.scss'

export const CompanyPositionsPage = () => {
  return (
    <div className={styles.company_employes}>
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComPosition />
        <TableHeaderComPosition />
      </div>
  </div>
  )
}

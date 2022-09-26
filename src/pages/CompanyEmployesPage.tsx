import React from 'react'
import { NavHeaderComEmployes } from '../components/company_employes/NavHeaderComEmployes'
import { TableHeaderComEmployes } from '../components/company_employes/TableHeaderComEmployes'
import styles from '../scss/CompanyEmployes.module.scss'

export const CompanyEmployesPage = () => {
  return (
    <div className={styles.company_employes}>
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComEmployes />
        <TableHeaderComEmployes />
      </div>
  </div>
  )
}

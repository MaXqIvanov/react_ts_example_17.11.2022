import React from 'react'
import { NavHeaderAdmCompany } from '../components/admin_company/NavHeaderAdmCompany'
import { TableHeaderAdmCompany } from '../components/admin_company/TableHeaderAdmCompany'
import styles from '../scss/AdminCompany.module.scss'

export const AdminCompanyPage = () => {
  return (
    <div className={styles.admin_company}>
      <div className={styles.admin_company_wrapper}>
        <NavHeaderAdmCompany />
        <TableHeaderAdmCompany />
      </div>
    </div>
  )
}

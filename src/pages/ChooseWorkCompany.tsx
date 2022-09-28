import React from 'react'
import { useSelector } from 'react-redux'
import { OneCompanyComponent } from '../components/choose_company/OneCompanyComponent'
import styles from '../scss/ChooseWorkCompany.module.scss'
import { RootState } from '../store/store'

export const ChooseWorkCompany = () => {
  // mock data
  const {listCompany} = useSelector((state:RootState)=> state.company)

  return (
    <div className={styles.choose_company}>
      <div className={styles.choose_company_wrapper}>
        <div className={styles.choose_company_title}>Компании</div>
        {listCompany ? listCompany.map((elem:any) => <OneCompanyComponent key={elem.id} elem={elem}/>)
        : <div className={styles.list_company_empty}>Список компаний пуст</div>}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import styles from '../scss/Component.module.scss'
import img_task from '../assets/sidebar/tasks.svg'
import img_control from '../assets/sidebar/control.svg'
import img_employes from '../assets/sidebar/employes.svg'
import img_company_employes from '../assets/sidebar/company_employes.svg'
import img_positions from '../assets/sidebar/positions.svg'
import img_company from '../assets/sidebar/company.svg'
import img_admin_employes from '../assets/sidebar/admin_employes.svg'

export const SideBar = () => {
    const sidebar_navigation_main = [
        {
            id: 1,
            title: 'ЗАДАЧИ',
            image: `${img_task}`
        },
        {
            id: 2,
            title: 'КОНТРОЛЬ',
            image: `${img_control}`
        },
        {
            id: 3,
            title: 'СОТРУДНИКИ',
            image: `${img_employes}`
        }
    ]
    const sidebar_navigation_company = [
        {
            id: 4,
            title: 'СОТРУДНИКИ',
            image: `${img_company_employes}`
        },
        {
            id: 5,
            title: 'ДОЛЖНОСТИ',
            image: `${img_positions}`
        }
    ]
    const sidebar_navigation_admin = [
        {
            id: 6,
            title: 'КОМПАНИИ',
            image: `${img_company}`
        },
        {
            id: 7,
            title: 'СОТРУДНИКИ',
            image: `${img_admin_employes}`
        }
    ]
    const [current_navigation_elem, setCurrentNavigationElem] = useState(1)
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar_wrapper}>
            {sidebar_navigation_main.length > 0 && sidebar_navigation_main.map((elem:any)=>
            <div onClick={()=> setCurrentNavigationElem(elem.id)} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
            <div className={styles.category_company}>КОМПАНИЯ</div>
            {sidebar_navigation_company.length > 0 && sidebar_navigation_company.map((elem:any)=>
            <div onClick={()=> setCurrentNavigationElem(elem.id)} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
            <div className={styles.category_company}>АДМИНИСТРИРОВАНИЕ</div>
            {sidebar_navigation_admin.length > 0 && sidebar_navigation_admin.map((elem:any)=>
            <div onClick={()=> setCurrentNavigationElem(elem.id)} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
        </div>
    </div>
  )
}
{/* <Route path={'/controls'} element={<ControlsPage />} />
<Route path={'/employes'} element={<EmployesPage />} />
<Route path={'/company_employes'} element={<CompanyEmployesPage />} />
<Route path={'/company_positions'} element={<CompanyPositionsPage />} />
<Route path={'/admin_companies'} element={<AdminCompanyPage />} />
<Route path={'/admin_employes'} element={<AdminEmployesPage />} /> */}
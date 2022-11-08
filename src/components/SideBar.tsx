import React, { useEffect, useState } from 'react'
import styles from '../scss/Component.module.scss'
import img_task from '../assets/sidebar/tasks.svg'
import img_control from '../assets/sidebar/control.svg'
import img_employes from '../assets/sidebar/employes.svg'
import img_company_employes from '../assets/sidebar/company_employes.svg'
import img_positions from '../assets/sidebar/positions.svg'
import img_company from '../assets/sidebar/company.svg'
import img_admin_employes from '../assets/sidebar/admin_employes.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const SideBar = ({isCollapseSideBar}:any) => {
    const router = useNavigate()
    const [top, setTop] = useState(60)
    const [top_margin, setTopMargin] = useState(0)
    const [current_navigation_elem, setCurrentNavigationElem] = useState<number | null>(1)
    const {user} = useSelector((state: RootState)=> state.auth)

    useEffect(() => {
        window.addEventListener('scroll', function(e) {
            console.log(document.getElementById('header')!.getBoundingClientRect().top);
            setTopMargin(document.getElementById('header')!.getBoundingClientRect().top)
          });
        return () => {
            window.removeEventListener('scroll' , function(e) {
                console.log(document.getElementById('header')!.getBoundingClientRect().top);
                setTopMargin(document.getElementById('header')!.getBoundingClientRect().top)
              })
        } 
    }, [])

    useEffect(() => {
      if(top_margin < -60){
        setTop(0)
      }
      else{
        setTop(60)
      }
    }, [top_margin])
    
    
    const sidebar_navigation_main = [
        {
            id: 1,
            title: 'ЗАДАЧИ',
            image: `${img_task}`,
            links: `/`,
            access: (user.is_executor === true || user.is_admin === true || user.is_staff === true) === true ? true : false
        },
        {
            id: 2,
            title: 'КОНТРОЛЬ',
            image: `${img_control}`,
            links: `/controls`,
            access: (user.is_controller === true || user.is_admin === true || user.is_staff === true) === true ? true : false
        },
        {
            id: 3,
            title: 'СОТРУДНИКИ',
            image: `${img_employes}`,
            links: `/employes`,
            access: (user.is_analyst === true || user.is_admin === true || user.is_staff === true) === true ? true : false
        }
    ]
    const sidebar_navigation_company = [
        {
            id: 4,
            title: 'ДОЛЖНОСТИ',
            image: `${img_positions}`,
            links: `/company_positions`,
            access: (user.is_admin === true || user.is_staff === true) === true ? true : false
        },  
        {
            id: 5,
            title: 'Пользователи',
            image: `${img_company_employes}`,
            links: `/company_employes`,
            access: (user.is_admin === true || user.is_staff === true) === true ? true : false
        }
    ]
    const sidebar_navigation_admin = [
        {
            id: 6,
            title: 'КОМПАНИИ',
            image: `${img_company}`,
            links: `/admin_companies`,
            access: (user.is_staff === true) === true ? true : false
        },
        {
            id: 7,
            title: 'СОТРУДНИКИ',
            image: `${img_admin_employes}`,
            links: `/admin_employes`,
            access: (user.is_staff === true) === true ? true : false
        }
    ]
    useEffect(() => {
      let current_path = window.location.pathname
      let navigation:any = sidebar_navigation_main.filter((elem:any) => elem.links === current_path)
      if(navigation.length > 0){
        setCurrentNavigationElem(navigation[0].id)
      }
      let navigation2:any = sidebar_navigation_company.filter((elem:any)=> elem.links === current_path)
      if(navigation2.length > 0){
        setCurrentNavigationElem(navigation2[0].id)
      }
      let navigation3:any = sidebar_navigation_admin.filter((elem:any)=> elem.links === current_path)
      if(navigation3.length > 0){
        setCurrentNavigationElem(navigation3[0].id)
      }      
      // дописать как появитяс бэк
    }, [window.location.pathname])
    
    
    useEffect(() => {
        console.log(current_navigation_elem);
        
      }, [current_navigation_elem])
  return (
    <div id='sidebar' className={`${styles.sidebar} ${isCollapseSideBar === true ? styles.sidebar_collapse : ''}`}>
        <div className={`${top !== 60 ? styles.sidebar_wrapper : styles.sidebar_wrapper_position} ${isCollapseSideBar === true ? styles.sidebar_collapse_wrapper : '' } `}>
            {sidebar_navigation_main.length > 0 && sidebar_navigation_main.map((elem:any)=>
            elem.access === true &&
            <div onClick={()=> {setCurrentNavigationElem(elem.id); router(`${elem.links}`)}} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
            {(isCollapseSideBar === false && (sidebar_navigation_admin[0].access === true || sidebar_navigation_admin[1].access === true)) && <div className={styles.category_company}>КОМПАНИЯ</div>}
            {sidebar_navigation_company.length > 0 && sidebar_navigation_company.map((elem:any)=>
            elem.access === true &&
            <div onClick={()=> {setCurrentNavigationElem(elem.id); router(`${elem.links}`)}} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
            {(isCollapseSideBar === false && (sidebar_navigation_admin[0].access === true || sidebar_navigation_admin[1].access === true)) && <div className={styles.category_company}>АДМИНИСТРИРОВАНИЕ</div> }
            {sidebar_navigation_admin.length > 0 && sidebar_navigation_admin.map((elem:any)=>
            elem.access === true &&
            <div onClick={()=> {setCurrentNavigationElem(elem.id); router(`${elem.links}`)}} key={elem.id} className={`${styles.navigation_main} ${current_navigation_elem === elem.id && styles.navigation_main_active}`}>
                <div style={{backgroundImage: `url(${elem.image})`}} className={styles.navigation_img}></div>
                <div className={styles.navigation_title}>{elem.title}</div>
            </div>)}
        </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/ru_RU';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/ru';
import calendar_img from '../../assets/clarity_calendar-line.svg'
import btn_left from '../../assets/btn_left.svg'
import btn_right from '../../assets/btn_right.svg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/redux';
import { setCurrentVariantTable } from '../../store/taskSlice';

export const NavHeader = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const { variant_table, current_variant_table }  = useSelector((state:RootState) => state.task)
    useEffect(() => {
        if(window.location.search){
            let current_setting = window.location.search.split('=')
            dispatch(setCurrentVariantTable(Number(current_setting[1])))
        }else{
            nav('/?setting=2')
        }     
    }, [])
    
    // const [current_days, setCurrentDays] = useState<number>(1)
    // для работы с неделями
    const [value, setValue] = React.useState(null);
    const [current_date, setCurrentDate] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const selectDate = (date:any) => {
        let dayOne = date[0]._d.getDate();
        let yearOne = date[0]._d.getFullYear();
        let monthOne = date[0]._d.getMonth();

        let dayTwo = date[1]._d.getDate();
        let yearTwo = date[1]._d.getFullYear();
        let monthTwo = date[1]._d.getMonth();
        setCurrentDate(`${dayOne}.${monthOne}.${yearOne} - ${dayTwo}.${monthTwo}.${yearTwo}`)
    }
    // для работы с неделями  конец

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
            {variant_table && variant_table.map((elem:any, index: number)=>
            <div onClick={()=> {
                dispatch(setCurrentVariantTable(Number(elem.id)))
                nav(`/?setting=${elem.id}`)
            }} key={elem.id}
            style={{borderLeft: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #9CB9C5',
            borderRight: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #9CB9C5'}}
            className={ elem.id !== current_variant_table ? styles.current_btn : styles.current_btn_active }>
                <span>{elem.title}</span>
            </div>)}
            <div className={styles.nav_header_time}>Загрузка по норме 15 ч.</div>
        </div>
        <div className={styles.nav_header_calendar}>
            <div className={styles.calendar_body}>
                <div onClick={()=> setIsVisible(!isVisible)} style={{backgroundImage: `url(${calendar_img})`}} className={styles.calendar_img}></div>
                <div className={styles.calendar_current_date }>{current_date}</div>
                <div className={styles.group_btn}>
                    <div style={{backgroundImage: `url(${btn_left})`}} className={styles.group_btn_left}></div>
                    <div style={{backgroundImage: `url(${btn_right})`}} className={styles.group_btn_right}></div>
                </div>
            </div>
           {isVisible && <RangeCalendar onSelect={(date:any)=> selectDate(date)}/> }
        </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Calendar from 'rc-calendar';
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
import { Switch } from '@mui/material';
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'

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
    const [isVisibleCalendarWeeks, setIsVisibleCalendarWeeks] = useState<boolean>(false);
    const selectDate = (date:any) => {
        let dayOne = date[0]._d.getDate();
        let yearOne = date[0]._d.getFullYear();
        let monthOne = date[0]._d.getMonth();

        let dayTwo = date[1]._d.getDate();
        let yearTwo = date[1]._d.getFullYear();
        let monthTwo = date[1]._d.getMonth();
        setCurrentDate(`${dayOne}.${monthOne + 1}.${yearOne} - ${dayTwo}.${monthTwo + 1}.${yearTwo}`)
    }
    // для работы с неделями  конец
    // для работы с днями
    useEffect(() => {
        setCalendarDayDay(moment().toDate().getDate())
        setCalendarDayMonth(moment().toDate().getMonth() + 1)
        setCalendarDayYear(moment().toDate().getFullYear())
    }, [])

    
    const [isVisibleCalendarDays, setIsVisibleCalendarDays] = useState<boolean>(false);
    const [current_date_day, setCurrentDateDay] = useState<string>(`${moment().toDate().getDate() >= 10 ? moment().toDate().getDate() : "0" + moment().toDate().getDate() }.${moment().toDate().getMonth() + 1 >= 10 ? moment().toDate().getMonth() + 1  : '0' + (moment().toDate().getMonth() + 1)}.${moment().toDate().getFullYear()}`)
    const [calendar_day_day, setCalendarDayDay] = useState<any>('')
    const [calendar_day_month, setCalendarDayMonth] = useState<any>('')
    const [calendar_day_year, setCalendarDayYear] = useState<any>('')
    const selectDateDay = (date:any) => {
        console.log(date);        
        let dayOne = date._d.getDate();
        let yearOne = date._d.getFullYear();
        let monthOne = date._d.getMonth();
        setCalendarDayDay(dayOne)
        setCalendarDayMonth(monthOne + 1)
        setCalendarDayYear(yearOne)
        setCurrentDateDay(`${dayOne >= 10 ? dayOne : "0" + dayOne}.${monthOne + 1 >= 10 ? monthOne + 1 : "0" + (monthOne + 1) }.${yearOne}`)
    }

    useEffect(() => {
        let elements:any = document.querySelectorAll(".rc-calendar-next-month-btn");
            for (var i = 0; i < elements.length; i++) {
            elements[i].onclick = function(){                
                if(Number(calendar_day_month) < 12){
                    setCalendarDayMonth(Number(calendar_day_month) + 1)
                    setCurrentDateDay(`${calendar_day_day}.${Number(calendar_day_month) + 1}.${calendar_day_year}`)
                }
            };
            }
    
        let elements2:any = document.querySelectorAll(".rc-calendar-prev-month-btn");
        console.log(elements2);
            
            for (var i = 0; i < elements2.length; i++) {
            elements2[i].onclick = function(){                
                if(Number(calendar_day_month) > 1){
                    setCalendarDayMonth(Number(calendar_day_month) - 1)
                    setCurrentDateDay(`${calendar_day_day}.${Number(calendar_day_month) - 1}.${calendar_day_year}`)
                }                
            };
            }
    }, [calendar_day_month, isVisibleCalendarDays, calendar_day_day])
    
    // для работы с днями конец
    const [completed_task, setCompletedTask] = useState<any>(false)
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
            {
                current_variant_table !== 1 &&
                <div className={styles.nav_header_time}>Загрузка по норме 15 ч.</div>
            }
        </div>
        {
            current_variant_table === 2 &&
            <div className={styles.nav_header_calendar}>
                <div className={styles.calendar_body}>
                    <div onClick={()=> 
                        setIsVisibleCalendarWeeks(!isVisibleCalendarWeeks)
                        } style={{backgroundImage: `url(${calendar_img})`}} className={styles.calendar_img}></div>
                    <div className={styles.calendar_current_date }>{current_date}</div>
                    <div className={styles.group_btn}>
                        <div style={{backgroundImage: `url(${btn_left})`}} className={styles.group_btn_left}></div>
                        <div style={{backgroundImage: `url(${btn_right})`}} className={styles.group_btn_right}></div>
                    </div>
                </div>
            {isVisibleCalendarWeeks && <RangeCalendar onSelect={(date:any)=> selectDate(date)}/> }
            </div>
        }
        {
            current_variant_table === 3 &&
            <div className={`${styles.nav_header_calendar} calendar_day`}>
                <div className={`${styles.group_for_checked} custom_switch`}>
                    {/* <Switch
                        className='custom_switch'
                        checked={completed_task}
                        onChange={(event) => setCompletedTask(event.target.checked)}
                    /> */}    
                        <label htmlFor="s2d">
                            <span  className={styles.title_checked}>завершенные</span>
                            <input id="s2d" type="checkbox" className="switch"
                            onChange={(e:any)=> setCompletedTask(e.target.checked)} checked={completed_task} />
                        </label>
                </div>
                <div className={styles.calendar_body_calendar_day}>
                    <div onClick={()=> 
                        setIsVisibleCalendarDays(!isVisibleCalendarDays)
                        } style={{backgroundImage: `url(${calendar_img})`}} className={styles.calendar_img}></div>
                    <div className={styles.calendar_current_date }>
                        {`${calendar_day_day >= 10 ? calendar_day_day : '0' + calendar_day_day}.${calendar_day_month >= 10 ? calendar_day_month : '0'+ calendar_day_month}.${calendar_day_year}`}
                    </div>
                    <div className={styles.group_btn}>
                        <div onClick={()=> {
                            setCurrentDateDay(`${(calendar_day_day > 1 ? calendar_day_day - 1 : calendar_day_day)}.${calendar_day_month}.${calendar_day_year}`)
                            setCalendarDayDay(calendar_day_day > 1 ? calendar_day_day - 1 : calendar_day_day)
                            }} style={{backgroundImage: `url(${btn_left})`}} className={styles.group_btn_left}></div>
                        <div onClick={()=> {
                             setCurrentDateDay(`${(calendar_day_day < moment(`${calendar_day_month}.${(calendar_day_day)}.${calendar_day_year}`).daysInMonth() ? calendar_day_day + 1 : calendar_day_day)}.${calendar_day_month}.${calendar_day_year}`)
                             setCalendarDayDay(calendar_day_day < moment(`${calendar_day_month}.${(calendar_day_day)}.${calendar_day_year}`).daysInMonth() ? calendar_day_day + 1 : calendar_day_day)
                        }} style={{backgroundImage: `url(${btn_right})`}} className={styles.group_btn_right}></div>
                    </div>
                </div>
            {isVisibleCalendarDays && <Calendar value={moment(`${calendar_day_month}.${(calendar_day_day)}.${calendar_day_year}`)} onSelect={(date:any)=> selectDateDay(date)}/> }
            </div> 
        }
    </div>
  )
}

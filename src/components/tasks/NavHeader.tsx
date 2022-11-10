import React, { useEffect, useState } from 'react'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/ru_RU';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/ru';
import calendar_img from '../../assets/task/calendar.svg'
import btn_left from '../../assets/btn_left.svg'
import btn_right from '../../assets/btn_right.svg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar, getTaskAll, getTaskDay, getTaskWeek, setCurrentVariantTable } from '../../store/taskSlice';
import { Switch, TextField } from '@mui/material';
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'
import useDebounce from '../../hooks/use-debounce';
import useClickOutSide from '../../hooks/useClickOutSide';

export const NavHeader = ({visible, setCurrentDayTask}:any) => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const { variant_table, current_variant_table, current_page_day, all_pages_day, current_page_week,
        all_pages_week, current_page_all, all_pages_all }  = useSelector((state:RootState) => state.task)
    const [search, setSearch] = useState<string>('')
    const debouncedSearchTerm = useDebounce(search, 300);

    
        // Variables for calendar_day
    const [calendar_day_day, setCalendarDayDay] = useState<any>('')
    const [calendar_day_month, setCalendarDayMonth] = useState<any>('')
    const [calendar_day_year, setCalendarDayYear] = useState<any>('')

        // Variables for calendar week
        // НАЧАЛО НЕДЕЛИ
    const [now_day, setNowDay] = useState<any>('')
    const [now_month, setNowMonth] = useState<any>('')
    const [now_year, setNowYear] = useState<any>('')
        // КОНЕЦ НЕДЕЛИ
    const [last_day, setLastDay] = useState<any>('')
    const [last_month, setLastMonth] = useState<any>('')
    const [last_year, setLastYear] = useState<any>('')
    // Variable for load data - change now_day or last_day
    const [is_change_day, setIsChangesDay] = useState<boolean>(false)

    const [choose_btn_week, setChooseBtnWeek] = useState<number>(1)
    const select_btn_week:any = [
        // {
        //     id: 1,
        //     title: 'Сегодня',
        //     class: `${styles.side_panel_btn_current_week}`
        // },
        // {
        //     id: 2,
        //     title: 'Вчера',
        //     class: `${styles.side_panel_btn_current_week}`
        // },
        {
            id: 1,
            title: 'Текущая неделя',
            class: `${styles.side_panel_btn_current_week}`
        },
        {
            id: 2,
            title: 'Прошлая неделя',
            class: `${styles.side_panel_btn_after_week}`
        }
    ]
    const [completed_task, setCompletedTask] = useState<any>(false)
    useEffect(() => {
        if(visible){

        }else {
            if(window.location.search){
                let current_setting = window.location.search.split('=')
                dispatch(setCurrentVariantTable(Number(current_setting[1])))
            }else{
                nav('/?setting=2')
            }     
        }
    }, [])

    useEffect(() => {
        if(current_variant_table === 1){
          dispatch(getTaskAll({search: search}))
        }else if(current_variant_table === 2){
          dispatch(getTaskWeek({now_day: now_day, now_month: now_month, now_year: now_year, last_day: last_day, last_month: last_month, last_year: last_year, search: search}))
        }else{
          dispatch(getTaskDay({now_day: calendar_day_day, now_month: calendar_day_month, now_year: calendar_day_year, search: search}))
        }
      }, [ debouncedSearchTerm, current_variant_table, current_page_day, current_page_week, current_page_all, calendar_day_day, calendar_day_month, calendar_day_year, is_change_day ])
    
    useEffect(() => {
        setSearch('')
    }, [current_variant_table])
    
    // const [current_days, setCurrentDays] = useState<number>(1)
    // для работы с неделями
    const [value, setValue] = React.useState(null);
    const [current_date, setCurrentDate] = useState<string>('')
    const [isVisibleCalendarWeeks, setIsVisibleCalendarWeeks] = useState<boolean>(false);

    const selectDate = (date:any) => {
        let dayOne = date[0]._d.getDate();
        let yearOne = date[0]._d.getFullYear();
        let monthOne = date[0]._d.getMonth() + 1;
        setNowDay(dayOne)
        setNowMonth(monthOne)
        setNowYear(yearOne)

        let dayTwo = date[1]._d.getDate();
        let yearTwo = date[1]._d.getFullYear();
        let monthTwo = date[1]._d.getMonth() + 1;
        setLastDay(dayTwo)
        setLastMonth(monthTwo)
        setLastYear(yearTwo)
    }
    const selectDateHover = (date:any) => {
        setIsChangesDay(!is_change_day)
    }
    useEffect(() => {
        getCurrentWeeks(choose_btn_week)
    }, [])

    const getCurrentWeeks = (number:number)=>{
        if(number === 1){
            let current_day = moment().toDate().getDate()
            let current_month = moment().toDate().getMonth() + 1
            let current_year = moment().toDate().getFullYear()
            let current_day_week = moment().toDate().getDay()
            
            setNowDay(current_day)
            setNowMonth(current_month)
            setNowYear(current_year)

                let current_week = current_day - (current_day_week - 1)
                if(current_week > 0){
                    setNowDay(current_week)
                    let next_week = current_week + 7
                    if(next_week <= moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()){
                        setLastDay(next_week - 1)
                        setLastMonth(current_month)
                        setLastYear(current_year)
                    }else{
                        let different_day =  next_week - Number(moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()) 
        
                        setLastDay(different_day - 1)
                        setLastMonth(current_month + 1)
                        setLastYear(current_year)
                        if(current_month + 1 > 12){
                            setLastMonth(1)
                            setLastYear(current_year + 1)
                        }
                    }
                }else{
                    setNowMonth(current_month - 1)
                    setLastMonth(current_month)
                    setNowDay(Number(moment(`${current_month + 1}.${(current_day)}.${current_year}`).daysInMonth()) - current_week)
                    let next_week = current_week + 7
                    if(next_week <= moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()){
                        setLastDay(next_week)
                        setLastMonth(current_month)
                        setLastYear(current_year)
                    }else{
                        let different_day =  next_week - Number(moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()) 
              
                        setLastDay(different_day - 1)
                        setLastMonth(current_month + 1)
                        setLastYear(current_year)
                        if(current_month + 1 > 12){
                            setLastMonth(1)
                            setLastYear(current_year + 1)
                        }
                    }
                }
        }
        if(number === 2){
            let current_day = moment().toDate().getDate() - 7
            let current_month = moment().toDate().getMonth() + 1
            let current_year = moment().toDate().getFullYear()
            let current_day_week = moment().toDate().getDay()
    
            setNowMonth(current_month)
            setNowYear(current_year)
            setLastMonth(current_month)
            setLastYear(current_year)
            if(current_day_week > 1){
                let current_week = current_day - (current_day_week - 1)
                if(current_week > 0){
                    setNowDay(current_week)
                    let next_week = current_week + 7
                    if(next_week <= moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()){
                        setLastDay(next_week - 1)
                        setLastMonth(current_month)
                        setLastYear(current_year)
                    }else{
                        let different_day =  next_week - Number(moment(`${current_month}.${(current_day)}.${current_year}`).daysInMonth()) 
                        console.log(different_day - 1);
                        
                        setLastDay(different_day - 1)
                        setLastMonth(current_month + 1)
                        setLastYear(current_year)
                        if(current_month + 1 > 12){
                            setLastMonth(1)
                            setLastYear(current_year + 1)
                        }
                    }
                }else{
                    let day_in_last_month = Number(moment(`${current_month - 1}.${(current_day)}.${current_year}`).daysInMonth())
                    let week_in_month = moment(`${current_month - 1}.${day_in_last_month}.${current_year}`).toDate().getDay()
                    console.log(week_in_month);
                    setNowDay(day_in_last_month - (week_in_month - 1))
                    if(Math.abs(now_month - last_month) < 1){
                        setNowMonth(current_month - 1)
                    }else{
                        setNowMonth(current_month - 1) 
                    }
                    setNowYear(current_year)
                    setLastDay(day_in_last_month - (week_in_month - 1) + 6 - day_in_last_month)
                    setLastMonth(current_month)
                    setLastYear(current_year)
                }
            }else{
                if(current_day < 0){
                    setNowMonth(current_month - 1)
                    setNowYear(current_year)
                    if(current_month - 1 < 1){
                        setNowYear(current_year - 1)
                        setNowMonth(12)
                    }
                    let day_in_month = Number(moment(`${current_month - 1}.${(current_day)}.${current_year}`).daysInMonth())
                    setNowDay(day_in_month - (Math.abs(current_day)))
                    let week_in_month = moment(`${now_month}.${day_in_month}.${now_year}`).toDate().getDay()
                    if(week_in_month == 0){
                        setLastDay(now_day - 1)
                    }else{
                        setLastDay(7 - (Math.abs(week_in_month)))
                    }
                }
            }
        }
        if (number === 3){
                // НАЧАЛО НЕДЕЛИ
                //? const [now_day, setNowDay] = useState<any>('')
                //? const [now_month, setNowMonth] = useState<any>('')
                //? const [now_year, setNowYear] = useState<any>('')
                // КОНЕЦ НЕДЕЛИ
                //? const [last_day, setLastDay] = useState<any>('')
                //? const [last_month, setLastMonth] = useState<any>('')
                //? const [last_year, setLastYear] = useState<any>('')
                let week_day = moment(`${now_month}.${now_day}.${now_year}`).toDate().getDay()
                if(week_day !== 1){
                    let different_day = now_day - (moment(`${now_month}.${now_day}.${now_year}`).toDate().getDay() - 1)
                    if(different_day < 0){
                        let day_current_now = Number(moment(`${now_month - 1}.${(now_day)}.${now_year}`).daysInMonth()) 
                        console.log(day_current_now);
                        let day_now = day_current_now - Math.abs(different_day)
                        setNowDay(day_now)
                        let day_month = now_month - 1
                        if(day_month == 0){
                            setNowMonth(1)
                            setNowYear(now_year - 1)
                        } else if(day_month > 12){
                            setNowMonth(1)
                            setNowYear(now_year + 1)
                        }else {
                            setNowMonth(day_month)
                        }
                    }else{
                        let day_now = now_day - (week_day - 1)
                        if(day_now == 0){
                            setNowDay(Number(moment(`${now_month - 1}.${(now_day)}.${now_year}`).daysInMonth()))
                            setNowMonth(now_month - 1)
                        }else{
                            setNowDay(day_now)
                        }
                        let last_day = day_now + 6
                        if (last_day > Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())){
                            let new_last_month = last_month + 1
                            let different_day =  day_now + 6 - Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth()) 
                            if(new_last_month > 12){
                                setLastYear(last_year + 1)
                                setLastMonth(1)
                                setLastDay(Math.abs(different_day))
                            }else{
                                setLastMonth(last_month + 1)
                                setLastDay(Math.abs(different_day))
                            }
                        }else{
                            setLastDay(day_now + 6)
                        }
                    }
                    console.log(different_day);
                }
                else{
                    
                    let new_now_day = now_day - 7
                    if(new_now_day > 0){
                        setNowDay(now_day - 7)
                        setLastDay(new_now_day + 6)
                        if(now_month !== last_month){
                            setLastMonth(last_month - 1)
                        }
                    }else{
                        if(now_month - 1 < 1){
                            let new_current_day_now = Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())
                            let day_on_current_week = Number(moment(`${now_month}.${(new_current_day_now)}.${now_year}`).daysInMonth())
                            let new_now_day = Number(moment(`12.${(last_day)}.${now_year - 1}`).daysInMonth())
                            let day_on_week_2 = moment(`12.${new_now_day}.${now_year - 1}`).toDate().getDay()
                            if(day_on_current_week){
                                setNowDay(new_now_day - 6)
                                setLastDay(new_now_day)
                                setLastMonth(12)
                                setLastYear(last_year - 1)
                            }else{
                                setNowDay(new_now_day - (day_on_week_2 - 1))
                                setLastDay(7 - day_on_week_2)
                                if(7-day_on_week_2 === 0){
                                    setLastDay(new_now_day)
                                }else{
                                    setLastDay(7-day_on_week_2)
                                }
                            }
                            setNowMonth(12)
                            setNowYear(now_year - 1)
                        }else{
                            setNowMonth(now_month - 1)
                            let day_on_month = Number(moment(`${now_month - 1}.${(now_day)}.${now_year}`).daysInMonth())
                            let week_day = moment(`${now_month}.${now_day}.${now_year}`).toDate().getDay()
                            if(week_day === 1){
                                if(now_day === 1){
                                    let day_on_month_2 = Number(moment(`${last_month - 1}.${(last_day)}.${last_year}`).daysInMonth())
                                    let day_on_week_2 = moment(`${last_month - 1}.${day_on_month_2}.${now_year}`).toDate().getDay()
                                    setLastDay(day_on_month_2)
                                    setLastMonth(last_month - 1)
                                    setNowDay(day_on_month_2 - 6)
                                    setNowMonth(now_month - 1)
                                }else{
                                    let day_on_month_2 = Number(moment(`${last_month - 1}.${(last_day)}.${last_year}`).daysInMonth())
                                    let day_on_week_2 = moment(`${last_month - 1}.${day_on_month_2}.${now_year}`).toDate().getDay()
                                    setLastDay(7 - day_on_week_2)
            
                                    setNowDay(day_on_month_2 - (day_on_week_2 - 1))
                                    setNowMonth(now_month - 1)
                                }
                            }else{
                                setLastDay(now_day - (week_day))
                                setNowDay(day_on_month - (week_day + 1))
                            }
                        }
                    }
                    if(last_day - now_day < 0){
                        if(Number(last_month - 1) === 0){
                            setLastMonth(12)
                        }else{
                            setLastMonth(now_month)   
                        }
                        setLastYear(now_year)
                    }
                }
        }
        if (number === 4){
  // НАЧАЛО НЕДЕЛИ
                // let element:any = document.getElementsByClassName("rc-calendar-prev-month-btn");
                // console.log(element);
                
                // element[0].click()
                //? const [now_day, setNowDay] = useState<any>('')
                //? const [now_month, setNowMonth] = useState<any>('')
                //? const [now_year, setNowYear] = useState<any>('')
                // КОНЕЦ НЕДЕЛИ
                //? const [last_day, setLastDay] = useState<any>('')
                //? const [last_month, setLastMonth] = useState<any>('')
                //? const [last_year, setLastYear] = useState<any>('')
                let week_day = moment(`${now_month}.${now_day}.${now_year}`).toDate().getDay()
                if(week_day !== 1){
                    let different_day = now_day - (moment(`${now_month}.${now_day}.${now_year}`).toDate().getDay() - 1)
                    if(different_day < 0){
                        let day_current_now = Number(moment(`${now_month - 1}.${(now_day)}.${now_year}`).daysInMonth()) 
                        console.log(day_current_now);
                        let day_now = day_current_now - Math.abs(different_day)
                        setNowDay(day_now)
                        let day_month = now_month - 1
                        if(day_month == 0){
                            setNowMonth(1)
                            setNowYear(now_year - 1)
                        } else if(day_month > 12){
                            setNowMonth(1)
                            setNowYear(now_year + 1)
                        }else {
                            setNowMonth(day_month)
                        }
                    }else{
                        let day_now = now_day - (week_day - 1)
                        setNowDay(day_now)
                        let last_day = day_now + 6
                        if (last_day > Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())){
                            let new_last_month = last_month + 1
                            let different_day =  day_now + 6 - Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth()) 
                            if(new_last_month > 12){
                                setLastYear(last_year + 1)
                                setLastMonth(1)
                                setLastDay(Math.abs(different_day))
                            }else{
                                setLastMonth(last_month + 1)
                                setLastDay(Math.abs(different_day))
                            }
                        }else{
                            setLastDay(day_now + 6)
                        }
                    }
                    console.log(different_day);
                }
                else{
                    let new_now_day = now_day + 7
                    if(new_now_day < Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())){
                        setNowDay(now_day + 7)
                        let day_in_month_2 = Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())
                        if(new_now_day + 6 > day_in_month_2){
                            let week_day_2 = moment(`${now_month}.${day_in_month_2}.${now_year}`).toDate().getDay()
                            setLastDay(7 - week_day_2)
                            setLastMonth(last_month + 1)
                            if (last_month + 1 > 12){
                                setLastMonth(1)
                                setLastYear(last_year + 1)
                            }
                        }else{
                            setLastDay(new_now_day + 6)
                        }
                        if(now_month !== last_month){
                            setNowMonth(now_month + 1)
                        }
                    }
                    else{                            
                        let current_day2 = Number(moment(`${now_month}.${(now_day)}.${now_year}`).daysInMonth())
                        let week_day = moment(`${now_month}.${current_day2}.${now_year}`).toDate().getDay()
                        let week_day_2 = moment(`${now_month}.${current_day2}.${now_year}`).toDate().getDay()
                        if(now_month + 1 > 12){
                            if(week_day_2 === 0){
                                setNowDay(1)
                                setLastDay(7)
                            }else{
                                setNowDay(7 - (week_day - 1))
                                setLastDay(7 - (week_day - 1) + 6)
                            }
                            setNowMonth(1)
                            setNowYear(now_year + 1)
                            setLastMonth(1)
                            setLastYear(now_year + 1)
                        }else{
                            if(week_day_2 === 0){
                                setLastMonth(last_month + 1)
                                setNowMonth(now_month + 1)
                                setNowDay(1)
                                setLastDay(7)
                            }else{
                                setNowDay(last_day + 1)
                                setLastDay(last_day + 7)
                                if(now_day + 7 > current_day2){
                                    setNowMonth(now_month + 1)
                                }
                                if(last_day + 7 > current_day2){
                                    setLastMonth(last_month + 1)
                                    if(last_month + 1 > 12){
                                        setLastMonth(1)
                                        setLastYear(last_year + 1)
                                    }
                                    setLastDay(7 - week_day)
                                }
                            }
                        }
                    }
                }
        }
        setIsChangesDay(!is_change_day)
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
        // console.log(elements2);
            
            for (var i = 0; i < elements2.length; i++) {
            elements2[i].onclick = function(){                
                if(Number(calendar_day_month) > 1){
                    setCalendarDayMonth(Number(calendar_day_month) - 1)
                    setCurrentDateDay(`${calendar_day_day}.${Number(calendar_day_month) - 1}.${calendar_day_year}`)
                }                
            };
            }
    }, [calendar_day_month, isVisibleCalendarDays, calendar_day_day])
    
    useEffect(() => {
        let elements3:any = document.querySelectorAll(".rc-calendar-next-year-btn");
            for (var i = 0; i < elements3.length; i++) {
                elements3[i].onclick = function(){                
                if(Number(calendar_day_year) < 4000){
                    setCalendarDayYear(Number(calendar_day_year) + 1)
                    setCurrentDateDay(`${calendar_day_day}.${Number(calendar_day_month)}.${Number(calendar_day_year) + 1}`)
                }
            };
            }
    
        let elements4:any = document.querySelectorAll(".rc-calendar-prev-year-btn");
        // console.log(elements4);
            
            for (var i = 0; i < elements4.length; i++) {
                elements4[i].onclick = function(){                
                if(Number(calendar_day_year) > 1){
                    setCalendarDayYear(Number(calendar_day_year) - 1)
                    setCurrentDateDay(`${calendar_day_day}.${Number(calendar_day_month)}.${Number(calendar_day_year) - 1}`)
                }                
            };
            }
    }, [calendar_day_month, isVisibleCalendarDays, calendar_day_day, calendar_day_year])
    // для работы с днями конец

    let rangeCalendar = useClickOutSide(()=> {
        setIsVisibleCalendarWeeks(false)
    })
    let CalendarDay = useClickOutSide(()=> {
        setIsVisibleCalendarDays(false)
    })

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
            {variant_table && variant_table.map((elem:any, index: number)=>
            <div onClick={()=> {
                dispatch(setCurrentVariantTable(Number(elem.id)))
                !visible && nav(`/?setting=${elem.id}`)
            }} key={elem.id}
            style={{borderLeft: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #CDD9DF',
            borderTopLeftRadius: index == 0 ? '3px' : '0px',
            borderBottomLeftRadius: index == 0 ? '3px' : '0px',
            borderTopRightRadius: index == 2 ? '3px' : '0px',
            borderBottomRightRadius: index == 2 ? '3px' : '0px',
            borderRight: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #CDD9DF'}}
            className={ elem.id !== current_variant_table ? styles.current_btn : styles.current_btn_active }>
                <span>{elem.title}</span>
            </div>)}
        </div>
        {
                current_variant_table == 1 &&
                <div className={`${styles.nav_header_calendar}`}>
                    {visible && 
                        <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.added_task_btn}>
                            <span>ДОБАВИТЬ ЗАДАЧУ + </span> 
                        </div>
                    }
                </div>
                
        }
        {
            current_variant_table === 2 &&
            <div className={styles.nav_header_calendar}>
                <div className={styles.calendar_body}>
                    <div onClick={()=> 
                        setIsVisibleCalendarWeeks(!isVisibleCalendarWeeks)
                        } style={{backgroundImage: `url(${calendar_img})`}} className={styles.calendar_img}></div>
                    <div className={styles.calendar_current_date}>
                        <div onClick={()=> 
                        setIsVisibleCalendarWeeks(!isVisibleCalendarWeeks)
                        } className={styles.calendar_img_btn}></div>
                        {/* !! work here */}
                     {`${now_day >= 10 ? now_day : '0' + now_day}.${now_month >= 10 ? now_month : '0'+ now_month}.${now_year} - 
                       ${last_day >= 10 ? last_day : '0' + last_day}.${last_month >= 10 ? last_month : '0'+ last_month}.${last_year} `}
                        {/* !! work here */}
                    </div>
                    <div className={styles.group_btn}>
                        <div onClick={()=>getCurrentWeeks(3)} style={{backgroundImage: `url(${btn_left})`}} className={styles.group_btn_left}></div>
                        <div onClick={()=>getCurrentWeeks(4)} style={{backgroundImage: `url(${btn_right})`}} className={styles.group_btn_right}></div>
                    </div>
                </div>
                <div className='custom_search_wrapper'>
                    <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    style={{marginLeft: '10px'}}
                    className='custom_search'
                    placeholder='Поиск'
                    ></input>
                    <div className='custom_search_icon'></div>
                </div>
                {visible && 
                    <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.added_task_btn}>
                        <span>ДОБАВИТЬ ЗАДАЧУ + </span> 
                    </div>
                }
            {isVisibleCalendarWeeks && 
            <div ref={rangeCalendar} className={`${styles.calendar_side_wrapper} calendar_week`}>
                <div className={styles.calendar_side_panel}>
                    {select_btn_week && select_btn_week.map((elem:any)=>
                    <div onClick={()=> {setChooseBtnWeek(elem.id)
                        getCurrentWeeks(elem.id)
                    }} key={elem.id} className={`${elem.class} ${elem.id === choose_btn_week ? styles.side_panel_btn_acitve : ''}`}>
                        <span>{elem.title}</span>
                    </div>)}
                    {/* <div className={styles.side_panel_btn_current_week}><span>Текущая неделя</span></div>
                    <div className={styles.side_panel_btn_after_week}><span>Прошлая неделя</span></div> 
                      //    */}
                </div>
                <RangeCalendar
                defaultValue={[moment(`${(now_month)}.${(now_day)}.${now_year}`), moment(`${(last_month)}.${(last_day)}.${last_year}`)]}
                hoverValue={[moment(`${(now_month)}.${(now_day)}.${now_year}`), moment(`${(last_month)}.${(last_day)}.${last_year}`)]}
                onHoverChange={(date:any)=> selectDate(date)}
                onSelect={(date:any)=> selectDate(date)}
                onChange={()=> selectDateHover('')}
                />
            </div>
            }
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
                        <div onClick={()=> 
                            setIsVisibleCalendarDays(!isVisibleCalendarDays)
                        } className={styles.calendar_img_btn_day}></div>
                    <div className={styles.calendar_current_date_day }>
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
                <div className='custom_search_wrapper_day'>
                    <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    style={{marginLeft: '10px'}}
                    className='custom_search'
                    placeholder='Поиск'
                    ></input>
                    <div className='custom_search_icon'></div>
                </div>
                {visible && 
                    <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.added_task_btn}>
                        <span>ДОБАВИТЬ ЗАДАЧУ + </span> 
                    </div>
                }
            {isVisibleCalendarDays && <div ref={CalendarDay}>
                    <Calendar value={moment(`${calendar_day_month}.${(calendar_day_day)}.${calendar_day_year}`)} onSelect={(date:any)=> selectDateDay(date)}/>
                </div>}
            </div> 
        }
    </div>
  )
}

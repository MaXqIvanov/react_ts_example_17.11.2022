import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../scss/Task.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeTask, changeVisibleSideBar, createTask } from '../../store/taskSlice';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-text-editor'
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import { changeVisibleSideBarCreate } from '../../store/employesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const myTheme = createTheme({
  // Set up your custom MUI theme here
})
Object.assign(myTheme, {
  overrides: {
      MUIRichTextEditor: {
          root: {
            border: '0.6px solid #9CB9C5',
            marginTop: 30,
            paddingLeft: '10px',
            paddingRight: '10px',
          },
          editor: {
            paddingTop: '30px',
            paddingLeft: '10px',
            paddingRight: '10px'
          }
      }
  }
})

export const EditSideBarEmployesTask = () => {
  const dispatch = useAppDispatch()
  const [date_start_task, setDateStartTask] = useState('')
  const [period_task_current, setPeriosTaskCurrent] = useState({id: 1, title: 'Ежедневно'})
  const [is_visible_period, setIsVisiblePeriod] = useState<boolean>(false)
  const [period_select, setPeriodSelect] = useState([
    {
      id: 1,
      title: 'Ежедневно'
    },
    // {
    //   id: 2,
    //   title: 'Еженедельно (вторник)'
    // },
    // {
    //   id: 3,
    //   title: 'Ежемесячно (первый вторник)'
    // },
    // {
    //   id: 4,
    //   title: 'Ежемесячно (выбранная дата)'
    // },
    // {
    //   id: 5,
    //   title: `Ежегодно (${moment().date()}.${moment().month()})`
    // },
    // {
    //   id: 6,
    //   title: 'По будням (с понедельника по пятницу'
    // },
    {
      id: 7,
      title: 'Не повторять'
    },
    {
      id: 999,
      title: 'Другое...'
    }
  ])
  const [report, setReport] = useState('')
  const handleChange = (newValue:any) => {
    setDateStartTask(newValue);
  };

  const editorRef:any = useRef(null);
  const [name_task, setNameTask] = useState<string>('')
  const [norm, setNorm] = useState<any>()
  const [start_before, setStartBefore] = useState<any>()
  const [artefact, setArtefact] = useState<string>('')
  const [select_delta_type, setSelectDeltaType] = useState([
  {
    id: 1,
    title: 'День',
    value: 'day'
  },
  {
    id: 2,
    title: 'Неделя',
    value: 'week'
  },
  {
    id: 3,
    title: 'Год',
    value: 'year'
  }
  ])
  const [delta_type, setDeltaType] = useState<typeof select_delta_type[0] | null>({
    id: 1,
    title: 'День',
    value: 'day'
  },)
  const [is_select_delta_type, setIsSelectDeltaType] = useState<boolean>(false)
  const [delta, setDelta] = useState<number | null>(1)
  const [mon, setMon] = useState<boolean>(false)
  const [tue, setTue] = useState<boolean>(false)
  const [wed, setWed] = useState<boolean>(false)
  const [thu, setThu] = useState<boolean>(false)
  const [fri, setFri] = useState<boolean>(false)
  const [sat, setSat] = useState<boolean>(false)
  const [sun, setSun] = useState<boolean>(false)
  const [visibleChooseData, setVisibleChooseData] = useState<boolean>(false)

  useEffect(() => {
    if(period_task_current.id === 1){
      setMon(true)
      setTue(true)
      setWed(true)
      setThu(true)
      setFri(true)
      setSat(true)
      setSun(true)
      setDelta(1)
      setDeltaType({
        id: 1,
        title: 'День',
        value: 'day'
      },)
    }
    if(period_task_current.id === 7){
      setMon(false)
      setTue(false)
      setWed(false)
      setThu(false)
      setFri(false)
      setSat(false)
      setSun(false)
      // need null but...
      setDelta(1)
      setDeltaType(null)
    }
    if(period_task_current.id === 999){
      setVisibleChooseData(!visibleChooseData)
    }
  }, [period_task_current])
  
  const saveNewInterval = ()=>{
    setPeriosTaskCurrent({
      id: period_select[period_select.length - 1].id + 1,
      title: `Кажд. ${delta} ${delta_type?.title}. - ${mon ? '' : 'понедельник '}${tue ? '' : 'вторник '}${wed ? '' : 'среда '}${thu ? '' : 'четверг '}${fri ? '' : 'пятница '} ${sat ? '' : 'суббота '} ${sun ? '' : 'воскресенье'}`
    })
    period_select.splice(period_select.length - 1,0, {
      id: period_select[period_select.length - 1].id + 1,
      title: `Кажд. ${delta} ${delta_type?.title}. - ${mon ? '' : 'понедельник '}${tue ? '' : 'вторник '}${wed ? '' : 'среда '}${thu ? '' : 'четверг '}${fri ? '' : 'пятница '} ${sat ? '' : 'суббота '} ${sun ? '' : 'воскресенье'}`
    })
  }  

  const {current_task_week} = useSelector((state: RootState)=> state.task)

  useEffect(() => {
    setNameTask(current_task_week.name)
    setStartBefore(current_task_week.start_before)
    setArtefact(current_task_week.artefact)
    setNorm(current_task_week.norm)
    editorRef.current = current_task_week.description
    setDelta(current_task_week.delta)
    setDeltaType(current_task_week.delta_type)
    setMon(current_task_week.mon)
    setTue(current_task_week.tue)
    setWed(current_task_week.wed)
    setThu(current_task_week.thu)
    setFri(current_task_week.fri)
    setSat(current_task_week.sat)
    setSun(current_task_week.sun)

  }, [current_task_week])
  
  useEffect(() => {
    editorRef.current = current_task_week.description
  }, [name_task, start_before, norm, artefact, period_select])
  


  return (
    <>
        <div className={`${styles.user_side_menu_create} user_side_menu`}>
          <div className={styles.user_side_menu_create_wrapper}>
            <div onClick={()=> dispatch(changeVisibleSideBarCreate(''))} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_create_btn}></div>
            <div className={styles.side_menu_title}><span>Задача</span></div>
            {/* <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div> */}
            <div className={styles.text_field_block_create}>
                {/* <TextField className={`${styles.current_task_field} current_task_field`} id="standard-basic" label="Задача" variant="standard" /> */}
                <div className={'wrapper_input_width_label'}>
                  <div className={'label'}>Название</div>
                  <input onChange={(e)=> setNameTask(e.target.value)} value={name_task} className={'input'}/>
                </div>
                <div style={{marginTop: '29px'}} className={'custom_select_wrapper_create'}>
                  <div className='label'>Периодичность</div>
                  <div onClick={()=> setIsVisiblePeriod(!is_visible_period)} className={'select_body_create'}>{period_task_current.title}</div>
                  <div className={'select_arrow_create'}></div>
                  {is_visible_period &&
                    <div className={'select_additional_create'}>
                      {period_select.map((elem:any)=> 
                        <div key={elem.id} onClick={()=>{
                          setPeriosTaskCurrent(elem)
                          setIsVisiblePeriod(false)
                        }} className={'select_one'}><span>{elem.title}</span></div>)}
                    </div>
                  }
                </div>
                <div style={{marginTop: '10px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Начало до</div>
                  <input type={'string'} onChange={(e)=> e.target.value.length <= 5 ? setStartBefore((e.target.value.length === 2 && e.target.value.length > start_before.length) ? e.target.value + ':' : e.target.value):''} value={start_before} placeholder='00:00' className={'input'}/>
                </div>
                <div style={{marginTop: '10px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Отчет/Артефакт</div>
                  <textarea onChange={(e)=> setArtefact(e.target.value)} value={artefact} rows={3}></textarea>
                </div>
                <div style={{marginTop: '10px', width: '142px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Норма</div>
                  <input type={'number'} onChange={(e) => setNorm(e.target.value)} value={norm} className={'input'}/>
                </div>
                <Editor apiKey='uhkrpnl1dfs4w8nt8a22oug4eap1yhb657nso942f8slxhu6' onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={`${editorRef.current}`}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'link image',
                      'table paste'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help',
                    content_style: `body { font-family: Roboto,Arial,sans-serif; font-size:12px; color: #343A40; line-height: 14px;}
                    p { margin-block-start: 0.2em; margin-block-end: 0.2em }`
                  }} />
            </div>
            <div style={{width: '100%'}} className={'custom_btn_wrapper'}>
                <div style={{display: 'flex', marginRight: '10px'}}>
                  <div onClick={()=> dispatch(changeVisibleSideBarCreate(''))} className={'btn_cancel'}><span>Отмена</span></div>
                  <div onClick={()=>{
                    dispatch(changeTask({
                      'name': name_task,
                      'artefact': artefact,
                    //   'description': editorRef.current?.description ? editorRef.current?.description : editorRef.current.getContent(),
                      'description': editorRef.current.annotator ? editorRef.current : editorRef.current.getContent(),
                      'norm': norm,
                      'start_before': start_before,
                      'start': `${moment().day()}.${moment().month()}.${moment().year()}`,
                      'end': null,
                      'mon': mon,
                      'thu': thu,
                      'tue': tue,
                      'wed': wed,
                      'fri': fri,
                      'sat': sat,
                      'sun': sun,
                      'delta': delta,
                      'delta_type': delta_type?.value
                    }))
                    // console.log(editorRef.current.getContent())
                  }} className={'btn_complete'}><span>СОХРАНИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        {visibleChooseData &&
          <div className='modal_choose_interval'>
            <div className='modal_choose_interval_wrapper'>
              <div className='modal_interval_title'>Повторять с интервалом</div>
              <input className={'modal_interval_input'}/>
              <div onClick={()=> setIsSelectDeltaType(!is_select_delta_type)} className={'custom_select_wrapper'}>
                <div className={'select_body'}>{delta_type?.title}</div>
                <div className={'select_arrow'}></div>
                {is_select_delta_type &&
                  <div className={'select_additional'}>
                    {select_delta_type?.length > 0 &&
                    select_delta_type.map((elem:any)=> <div key={elem.id} onClick={()=> setDeltaType(elem)} className={'position_current_day'}>
                      <span>{elem.title}</span>
                    </div>)}
                  </div>
                }
              </div>
              <div className='modal_repeat_day'>Дни повторения</div>
              <div className='modal_all_day'>
                <div onClick={()=> 
                  setMon(!mon)
                } className={mon === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Пн</span></div>
                <div onClick={()=> 
                  setTue(!tue)
                } className={tue === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Вт</span></div>
                <div onClick={()=> 
                  setWed(!wed)
                } className={wed === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Ср</span></div>
                <div onClick={()=> 
                  setThu(!thu)
                } className={thu === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Чт</span></div>
                <div onClick={()=> 
                  setFri(!fri)
                } className={fri === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Пт</span></div>
                <div  onClick={()=> 
                  setSat(!sat)
                }className={sat === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Сб</span></div>
                <div onClick={()=> 
                  setSun(!sun)
                } className={sun === true ? 'modal_current_day' : 'modal_current_day_active'}><span>Вс</span></div>
              </div>
              <div style={{width: '100%'}} className={'custom_btn_wrapper_interval'}>
                <div style={{display: 'flex', marginRight: '10px'}}>
                  <div onClick={()=> setVisibleChooseData(false)} className={'btn_cancel'}><span>Отмена</span></div>
                  <div onClick={()=> saveNewInterval()} className={'btn_complete'}><span>СОХРАНИТЬ</span></div>
                </div>
              </div>
            </div>
          </div>}
        <div onClick={()=> dispatch(changeVisibleSideBarCreate(''))} className={styles.user_side_menu_plug}></div>
      </>
  )
}

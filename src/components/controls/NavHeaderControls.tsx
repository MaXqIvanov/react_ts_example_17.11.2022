import React, { useEffect, useState } from 'react'
import styles from '../../scss/Controls.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useClickOutSide from '../../hooks/useClickOutSide'
import { useAppDispatch } from '../../hooks/redux'
import { getControlTaskAll, getPosition, selectCurrentPosition } from '../../store/controlSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const NavHeaderControls = () => {
  const dispatch = useAppDispatch()
  const {position_all, position_current} = useSelector((state: RootState)=> state.control)
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false)
  const [is_approve, setCheckedTask] = useState<boolean>(false)
  const [position, setPosition] = useState('');
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(false);
  const handleChange = (event:any) => {
    setPosition(event.target.value);
  };
  let select = useClickOutSide(()=> {
    setIsVisibleSelect(false)
  })
  useEffect(() => {
    dispatch(getPosition(''))
  }, [])
  useEffect(() => {
    dispatch(getControlTaskAll({is_approve: is_approve}))
  }, [position_current, is_approve])
  
  

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
          <div style={{marginRight: '10px'}} className={`${styles.group_for_checked} custom_switch`}> 
              <label htmlFor="s2d">
                  <span  className={styles.title_checked}>завершенные</span>
                  <input id="s2d" type="checkbox" className="switch"
                  onChange={(e:any)=> setCheckedTask(e.target.checked)} checked={is_approve} />
              </label>
          </div>
          <div onClick={()=> setIsVisibleSelect(!isVisibleSelect)} className={'custom_select_wrapper'}>
            <div className={'select_body'}>{position_current.name ? position_current.name : 'Должность'}</div>
            <div className={'select_arrow'}></div>
            {isVisibleSelect &&
              <div ref={select} className={'select_additional'}>
                <div onClick={()=> dispatch(selectCurrentPosition({current_position: {}, setIsVisibleSelect: setIsVisibleSelect}))} className={'position_current'}>Все</div>
                {position_all?.length > 0 &&
                position_all.map((elem:any)=> <div onClick={()=> dispatch(selectCurrentPosition({current_position: elem, setIsVisibleSelect: setIsVisibleSelect}))} className={'position_current'}>
                  <span>{elem.name}</span>
                </div>)}
              </div>
            }
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
        </div>
    </div>
  )
}

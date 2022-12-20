import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../scss/CompanyPosition.module.scss';
import close_btn from '../../assets/close_btn.svg';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';
import { createPosition } from '../../store/reducers/position/ActionPosition';
import { getEmployesCompany } from '../../store/reducers/employes/ActionEmployes';

export const SideBar = ({ setIsVisibleSideBar, isvisible_sidebaer }: any) => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<any>({});
  const [image, setImage] = useState<any>(null);
  const [image_preview, setImagePriview] = useState<any>(null);
  const [name, setName] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false);
  const [isVisibleSelectEmp, setIsVisibleSelectEmp] = useState<boolean>(false);
  const [employee, setEmployes] = useState<any>({});
  const select = useClickOutSide(() => {
    setIsVisibleSelect(false);
  });
  const select_emp = useClickOutSide(() => {
    setIsVisibleSelectEmp(false);
  });
  const { position_company_all } = useSelector((state: RootState) => state.position);
  const { employes_company_all } = useSelector((state: RootState) => state.employes);
  useEffect(() => {
    dispatch(getEmployesCompany({ search: '' }));
  }, []);

  useEffect(() => {
    if (employee._user) {
      console.log(employee);
      setImagePriview(employee._user.avatar);
      setNameUser(employee._user.name);
    }
  }, [employee]);
  return (
    <>
      <div id={'company_position_sidebar'} className={`${styles.user_side_menu}`}>
        <div className={styles.user_side_menu_wrapper}>
          <div
            onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)}
            style={{ backgroundImage: `url(${close_btn})` }}
            className={styles.close_user_side_menu_btn}
          ></div>
          <div className={styles.side_menu_header}>
            <span>Должность</span>
          </div>
          <Button
            disabled
            style={{
              marginTop: '20px',
              backgroundImage: `url(${image_preview ? image_preview.src : ''})`,
            }}
            component="label"
            className={styles.header_user_not_img}
          >
            <input type="file" hidden />
            <img
              className={`${image_preview ? 'image_logo' : 'image_not_logo'}`}
              src={image_preview ? image_preview : ''}
              alt={undefined}
            ></img>
            {!image_preview && (
              <span>
                {(nameUser?.split(' ')[0]?.split('')[0]
                  ? nameUser?.split(' ')[0]?.split('')[0]?.toUpperCase()
                  : '') +
                  (nameUser?.split(' ')[1]?.split('')[0]
                    ? nameUser?.split(' ')[1]?.split('')[0]?.toUpperCase()
                    : '')}
              </span>
            )}
          </Button>
          <div
            style={{ marginTop: '10px', width: 'calc(100% - 40px)' }}
            className={'wrapper_input_width_label'}
          >
            <div className={'label'}>Название</div>
            <input onChange={(e) => setName(e.target.value)} value={name} className={'input'} />
          </div>
          <div
            style={{ marginTop: '30px', width: 'calc(100% - 40px)' }}
            onClick={() => setIsVisibleSelect(!isVisibleSelect)}
            className={'custom_select_wrapper_admin wrapper_input_width_label'}
          >
            <div style={{ marginTop: '-28px', marginLeft: '-10px' }} className={'label'}>
              Старшая должность
            </div>
            <div style={{ marginTop: '15px' }} className={'select_body'}>
              {position.name ? position.name : ''}
            </div>
            <div className={'select_arrow'}></div>
            {isVisibleSelect && (
              <div ref={select} style={{ maxHeight: '100px' }} className={'select_additional'}>
                {position_company_all?.length > 0 &&
                  position_company_all.map((elem: any) => (
                    <div
                      key={elem.id}
                      onClick={() => setPosition(elem)}
                      className={'position_current'}
                    >
                      <span>{elem.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div
            style={{ marginTop: '30px', width: 'calc(100% - 40px)' }}
            onClick={() => setIsVisibleSelectEmp(!isVisibleSelectEmp)}
            className={'custom_select_wrapper_admin wrapper_input_width_label'}
          >
            <div style={{ marginTop: '-28px', marginLeft: '-10px' }} className={'label'}>
              Сотрудник
            </div>
            <div style={{ marginTop: '15px' }} className={'select_body'}>
              {employee?._user?.name ? employee?._user?.name : ''}
            </div>
            <div className={'select_arrow'}></div>
            {isVisibleSelectEmp && (
              <div ref={select_emp} style={{ maxHeight: '100px' }} className={'select_additional'}>
                {employes_company_all?.length > 0 &&
                  employes_company_all.map((elem: any) => (
                    <div
                      key={elem.id}
                      onClick={() => setEmployes(elem)}
                      className={'position_current'}
                    >
                      <span>{elem?._user?.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              width: '100%',
              marginRight: '30px',
              marginBottom: '20px',
            }}
            className={'custom_btn_wrapper_position'}
          >
            <div onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div
              onClick={() =>
                dispatch(
                  createPosition({
                    name: name,
                    parent_position: position.id,
                    employee: employee.id,
                    setIsVisibleSideBar: setIsVisibleSideBar,
                  })
                )
              }
              className={'btn_complete'}
            >
              <span>Соханить</span>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};

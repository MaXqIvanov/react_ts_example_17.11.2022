import React, { useEffect, useState } from 'react';
import styles from '../../scss/AdminCompany.module.scss';
import close_btn from '../../assets/close_btn.svg';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';
import { changeCompanyAdmin, getCompanyEmployes } from '../../store/reducers/company/ActionCompany';

interface IPropsModalWindow {
  setIsVisibleModalWindow: CallableFunction;
  isvisible_modal: boolean;
} 
export const ModalWindow = ({ setIsVisibleModalWindow, isvisible_modal }: IPropsModalWindow) => {
  const dispatch = useAppDispatch();
  const [admin, setAdmin] = useState<any>({});
  const [name, setName] = useState<string>('');
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false);
  const { company_employes, company_admin_current } = useSelector(
    (state: RootState) => state.company
  );
  const select = useClickOutSide(() => {
    setIsVisibleSelect(false);
  });

  useEffect(() => {
    dispatch(getCompanyEmployes());
  }, []);
  useEffect(() => {
    setName(company_admin_current.name);
    if (company_admin_current.admin) {
      setAdmin(company_admin_current.admin._user);
    }
  }, [company_admin_current]);

  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div
            onClick={() => setIsVisibleModalWindow(!isvisible_modal)}
            style={{ backgroundImage: `url(${close_btn})` }}
            className={styles.close_user_side_menu_btn}
          ></div>
          <div className={styles.side_menu_header}>
            <span>Компания</span>
          </div>
          <div className={styles.side_menu_body}>
            <div style={{ marginTop: '0px' }} className={'wrapper_input_percent'}>
              <input
                placeholder="Наименование компании"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <div
              style={{ marginTop: '10px' }}
              onClick={() => setIsVisibleSelect(!isVisibleSelect)}
              className={'custom_select_wrapper_admin'}
            >
              <div className={'select_body'}>{admin.name ? admin.name : 'Администратор'}</div>
              <div className={'select_arrow'}></div>
              {isVisibleSelect && (
                <div ref={select} style={{ maxHeight: '100px' }} className={'select_additional'}>
                  {company_employes?.length > 0 &&
                    company_employes.map((elem: any) => (
                      <div
                        key={elem.id}
                        onClick={() => setAdmin(elem)}
                        className={'position_current'}
                      >
                        <span>{elem.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
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
            <div onClick={() => setIsVisibleModalWindow(!isvisible_modal)} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div
              onClick={() =>
                dispatch(
                  changeCompanyAdmin({
                    name: name,
                    admin: admin.id,
                    setIsVisibleSideBar: setIsVisibleModalWindow,
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
      <div onClick={() => setIsVisibleModalWindow(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};

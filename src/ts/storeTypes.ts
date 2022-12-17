export interface IUser{
  is_staff: boolean;
  is_executor: boolean;
  is_controller: boolean;
  is_analyst: boolean;
  is_admin: boolean;
}
export interface ICompany{
  id: number;
}
export interface TAuthState{
  user: IUser;
  auth: boolean;
  loading: boolean;
  user_company: ICompany[];
  current_company: ICompany;
  first_render: boolean;
};
export type TaskState = {
  loading: boolean;
  variant_table: Array<Object>;
  current_variant_table: number;
  isVisibleSideBar: boolean;
  get_all_task_day: Array<Object>;
  current_task_day: any;
  get_all_task_week: Array<any>;
  current_task_week: any;
  get_all_task_all: Array<Object>;
  current_task_all: any;
  current_page_day: number;
  all_pages_day: number;
  current_page_week: number;
  all_pages_week: number;
  current_page_all: number;
  all_pages_all: number;
  current_task_index: number;
  need_load_data: boolean;
};
export type TCompanyState = {
  loading: boolean;
  company_admin_all:  object[];
  company_admin_current: object;
  company_admin_index: number;
  current_page: number;
  all_pages: number;
  company_employes: object[];
};
export type ControlState = {
  loading: boolean;
  isVisibleSideBar: boolean;
  controls_task_all: Array<any>;
  current_page: number;
  all_pages: number;
  position_all: Array<any>;
  position_current: any;
  controls_task_current: any;
  controls_task_index: number;
};
export type PositionState = {
  loading: boolean;
  isVisibleSideBar: boolean;
  position_all: Array<any>;
  position_current: any;
  // company section
  position_company_all: Array<Object>;
  position_company_current: Object;
  // pagination
  current_page: number;
  all_pages: number;
  position_company_index: number;
};

export type EmployesState = {
  loading: boolean;

  // for sidebar
  isVisibleSideBar: boolean;
  // get_employes_all
  employes_all: Array<Object>;
  employes_current: Object;
  employes_current_index: number;
  // for pagination
  current_page: number;
  all_pages: number;
  current_page_company_employes: number;
  all_pages_company_employes: number;
  // current_page_admin_employes: number,
  // all_pages_admin_employes: number,
  isVisibleSideBarCreate: boolean;
  // emp_company
  employes_company_all: Array<Object>;
  employes_company_current: Object;
  employes_company_index: number;
  // emp_admin
  employes_admin_all: Array<Object>;
  employes_admin_current: Object;
  position_all_admin: Array<Object>;
  employes_admin_index: number;
};

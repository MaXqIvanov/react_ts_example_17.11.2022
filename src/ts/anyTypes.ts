export type AuthState = {
    user: any,
    auth: boolean,
    loading: boolean,
}
export type TaskState = {
    loading: boolean,
    variant_table: Array<any>,
    current_variant_table: number,
    isVisibleSideBar: boolean,
    get_all_task_day: Array<any>,
    current_task_day: any,
    get_all_task_week: Array<any>,
    current_task_week: any,
    get_all_task_all: Array<any>,
    current_task_all: any,
    current_page_day: number,
    all_pages_day: number,
    current_page_week: number,
    all_pages_week: number,
    current_page_all: number,
    all_pages_all: number,
}
export type CompanyState = {
    loading: boolean,
    listCompany: Array<any>,
    current_page: number,
    all_pages: number,

}
export type ControlState = {
    variant_table: Array<any>,
    current_variant_table: number,
    loading: boolean,
    isVisibleSideBar: boolean,
    controls_task_all: Array<any>
    current_page: number,
    all_pages: number,
}
export type PositionState = {
    variant_table: Array<any>,
    current_variant_table: number,
    loading: boolean,
    isVisibleSideBar: boolean,
    // pagination
    current_page: number,
    all_pages: number,
}

export type EmployesState = {
    variant_table: Array<any>,
    current_variant_table: number,
    loading: boolean,

    // for sidebar
    isVisibleSideBar: boolean,
    // get_employes_all
    employes_all: Array<any>,

    // for pagination
    current_page: number,
    all_pages: number
    current_page_company_employes: number,
    all_pages_company_employes: number,
    current_page_admin_employes: number,
    all_pages_admin_employes: number,
}
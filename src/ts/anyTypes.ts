export type AuthState = {
    user: any,
    auth: boolean,
    loading: boolean,
}
export type TaskState = {
    loading: boolean,
    variant_table: Array<any>,
    current_variant_table: number
}
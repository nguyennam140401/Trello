export const boardReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'GET_BOARD':
            return {
                ...state,
                board: payload,
            }
        case 'COLUMN_DRAG':
            return {
                ...state,
                board: payload,
            }
        case 'CREATE_TASK':
            return {
                ...state,
            }
        case 'CREATE_COLUMN':
            return {
                ...state,
            }
        case 'UPDATE_COLUMN':
            return {
                ...state,
            }
        case 'DELETE_COLUMN':
            return {
                ...state,
            }
        case 'CREATE_TASK':
            return {
                ...state,
            }

        default:
            return {
                ...state,
            }
    }
}

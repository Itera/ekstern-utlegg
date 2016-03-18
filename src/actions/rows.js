export const addRow = () => {
    return {
        type: 'ADD_ROW'
    }
}

export const clearRows= () => {
    return {
        type: 'CLEAR_ROWS'
    }
}

export const updateRow = (row) => {
    return {
        type: 'UPDATE_ROW',
        row
    }
}
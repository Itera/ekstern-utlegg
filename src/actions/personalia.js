export const updatePersonalia = (personalia) => {
    return {
        type: 'UPDATE_PERSONALIA',
        personalia
    }
}

export const clearPersonalia = () => {
    return {
        type: 'CLEAR_PERSONALIA'
    }
}

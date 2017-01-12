import {formatAccount, formatTlf, tlfregex, accountregex} from '../formatters'
import validate from 'validate.js'

const emptyField = {
    value: '',
    valid: false,
    validReason: ''
}

function initialState() {
    return {
        name: Object.assign({}, emptyField),
        address: Object.assign({}, emptyField),
        postcode: Object.assign({}, emptyField),
        town: Object.assign({}, emptyField),
        telephone: Object.assign({}, emptyField),
        email: Object.assign({}, emptyField),
        event: Object.assign({}, emptyField),
        account: Object.assign({}, emptyField),
        dept: Object.assign({}, emptyField)
    }
}

function validateField(field, validations) {
    const fieldState = Object.assign({}, emptyField)

    validations.presence = true

    fieldState.value = field.value
    fieldState.validReason = validate.single(field.value, validations)
    fieldState.valid = fieldState.validReason === undefined

    return fieldState
}

function updateState(state, action) {
    const newState = Object.assign({}, state, action.personalia)

    if (newState.account.value) {
        newState.account.value = formatAccount(newState.account.value)
    }

    if (newState.telephone.value) {
        newState.telephone.value = formatTlf(newState.telephone.value)
    }

    if (!newState.dept || newState.dept == '') {
        newState.dept = '110 410'
    }

    newState.name = validateField(newState.name, {length: {minimum: 3}})
    newState.address = validateField(newState.address, {length: {minimum: 3}})
    newState.postcode = validateField(newState.postcode, {length: {is: 4}, format: /^[0-9]{4}$/})
    newState.telephone = validateField(newState.telephone, {format: tlfregex})
    newState.town = validateField(newState.town, {length: {minimum: 2}})
    newState.event = validateField(newState.event, {length: {minimum: 3}})
    newState.account = validateField(newState.account, {format: accountregex})
    newState.email = validateField(newState.email, {email: true})
    newState.dept = validateField(newState.dept, {length: {is: 7}, format: /^[0-9]{3} [0-9]{3}$/})

    return newState
}

function clearState() {
    return initialState()
}

export default function updatePersonalia(state = initialState(), action) {
    switch (action.type) {
        case 'UPDATE_PERSONALIA':
            return updateState(state, action)
        case 'CLEAR_PERSONALIA':
            return clearState()
        default:
            return state
    }
}

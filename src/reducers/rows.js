import validate from 'validate.js'
import moment from 'moment'

function initialState() {
    return {
        rows: [],
        total: 0
    }
}

let counter = 0

function updateState(state, action) {
    const newState = Object.assign({}, state)

    let sum = 0

    for (const idx in newState.rows) {
        let row = newState.rows[idx]

        if (row.id === action.row.id) {
            row = Object.assign({}, row, action.row)

            validate.extend(validate.validators.datetime, {
                parse: function (value) {
                    return +moment.utc(value)
                },
                format: function (value, options) {
                    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
                    return moment.utc(value).format(format)
                }
            })

            row.validReason = validate(row,
                {
                    date: {
                        presence: true,
                        date: {
                            earliest: moment().subtract(1, 'years').format('YYYY-MM-DD'),
                            latest: moment().format('YYYY-MM-DD')
                        }
                    },
                    description: {
                        presence: true,
                        length: {minimum: 2}
                    },
                    supplier: {
                        presence: true,
                        length: {minimum: 2}
                    },
                    cost: {
                        presence: true,
                        numericality: {greaterThan: 0}
                    }
                }
            )

            row.valid = row.validReason === undefined

            newState.rows[idx] = row
        }

        if (row.valid) {
            sum += row.cost
        }
    }

    newState.total = sum

    return newState
}

function addRow(state) {
    const newState = Object.assign({}, state)

    newState.rows.push({
        id: counter++,
        date: '',
        description: '',
        cost: 0,
        supplier: '',
        valid: false
    })

    return newState
}

function clearState() {
    return initialState()
}

export default function updateRows(state = initialState(), action) {
    switch (action.type) {
        case 'UPDATE_ROW':
            return updateState(state, action)
        case 'ADD_ROW':
            return addRow(state)
        case 'CLEAR_ROWS':
            return clearState()
        default:
            return state
    }
}

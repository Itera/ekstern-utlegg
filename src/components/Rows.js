import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {addRow, clearRows, updateRow} from '../actions/rows'

export const rowFieldPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    supplier: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    validReason: PropTypes.shape({
        date: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.arrayOf(PropTypes.string),
        supplier: PropTypes.arrayOf(PropTypes.string),
        cost: PropTypes.arrayOf(PropTypes.string)
    })
}).isRequired

export const rowsFormPropTypes = PropTypes.shape({
    rows: PropTypes.arrayOf(rowFieldPropTypes).isRequired,
    total: PropTypes.number.isRequired
}).isRequired

export class NumberInput extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const data = {
            id: this.props.id
        }

        data[this.props.name] = Number(event.target.value)

        this.props.onUpdate(data)
    }

    render() {

        return <div className={`col-md-${this.props.width}`}>
            <input type={this.props.inputType} className="form-control" id={`${this.props.name}_${this.props.id}`}
                   name={`${this.props.name}_${this.props.id}`}
                   placeholder={this.props.placeholder} value={this.props.value} step="0.01" min="0"
                   onChange={this.handleChange}/>
        </div>
    }
}

NumberInput.propTypes = {
    id: PropTypes.number.isRequired,
    inputType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
}

export class Input extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const data = {
            id: this.props.id
        }

        data[this.props.name] = event.target.value
        this.props.onUpdate(data)
    }

    render() {
        return <div className={`col-md-${this.props.width}`}>
            <input type={this.props.inputType} className="form-control" id={`${this.props.name}_${this.props.id}`}
                   name={`${this.props.name}_${this.props.id}`}
                   placeholder={this.props.placeholder} value={this.props.value}
                   onChange={this.handleChange}/>
        </div>
    }
}

Input.propTypes = {
    id: PropTypes.number.isRequired,
    inputType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
}

export class Row extends React.Component {

    renderValid(valid) {
        if (!valid) {
            return <div className="col-sm-1">
                <span className="glyphicon glyphicon-warning-sign"/>
            </div>

        }

        return <div className="col-sm-1">
            <span className="glyphicon glyphicon-ok"/>
        </div>
    }

    render() {
        const row = this.props.row

        return <div className="form-group">
            <Input id={row.id} name="date" placeholder="Dato" inputType="date" value={row.date}
                   onUpdate={this.props.onUpdate} width={2}/>
            <Input id={row.id} name="supplier" placeholder="Leverandør" inputType="text" value={row.supplier}
                   onUpdate={this.props.onUpdate} width={2}/>
            <Input id={row.id} name="description" placeholder="Beskrivelse" inputType="text"
                   value={row.description}
                   onUpdate={this.props.onUpdate} width={4}/>
            <NumberInput id={row.id} name="cost" placeholder="Beløp inkl. mva (NOK)" inputType="number" value={row.cost}
                   onUpdate={this.props.onUpdate} width={3}/>

            <div className="col-md-1">
                {this.renderValid(row.valid)}
            </div>
        </div>
    }
}

Row.propTypes = {
    row: rowFieldPropTypes,
    onUpdate: PropTypes.func.isRequired
}

export class Form extends React.Component {
    render() {
        const rows = this.props.rows.rows
        const total = this.props.rows.total

        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Utlegg</h1>

                    <p>Legg til rader - en per utlegg. Tomme/uferdige/ugyldige rader blir ikke med videre</p>
                </div>
            </div>

            <div className="row">
                <form className="form-horizontal" role="form">
                    {rows.map(row =>
                        <Row key={`row_${row.id}`} row={row} onUpdate={this.props.onUpdate}/>
                    )}
                </form>
            </div>

            <div className="row">
                <div className="col-md-offset-9 col-md-3">
                    <p>Sum: {this.props.rows.total.toFixed(2)} NOK</p>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-2">
                        <Link className="btn btn-primary" to="/done">Fortsett</Link>
                    </div>
                    <div className="col-sm-2">
                        <a className="btn btn-default" onClick={() => this.props.onAdd()}>Ny rad</a>
                    </div>
                    <div className="col-sm-2">
                        <a className="btn btn-warning" onClick={() => this.props.onClear()}>Tøm feltene</a>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    }
}

Form.propTypes = {
    rows: rowsFormPropTypes,
    onAdd: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        rows: state.rows
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: () => {
            dispatch(addRow())
        },
        onClear: () => {
            dispatch(clearRows())
        },
        onUpdate: (row) => {
            dispatch(updateRow(row))
        }
    }
}

const Rows = connect(mapStateToProps, mapDispatchToProps)(Form)

export default Rows
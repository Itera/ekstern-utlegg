import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {updatePersonalia, clearPersonalia} from '../actions/personalia'

const fieldPropTypes = PropTypes.shape({
    value: PropTypes.string.isRequired,
    validReason: PropTypes.arrayOf(PropTypes.string)
}).isRequired

export const personaliaFormPropTypes = PropTypes.shape({
    address: fieldPropTypes,
    postcode: fieldPropTypes,
    town: fieldPropTypes,
    telephone: fieldPropTypes,
    email: fieldPropTypes,
    event: fieldPropTypes,
    account: fieldPropTypes
}).isRequired

export class Input extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const data = {}
        data[this.props.field] = {value: event.target.value}
        this.props.onUpdate(data)
    }

    renderValid(valid) {
        if (!valid) {
            return null
        }

        return <div className="col-sm-2">
            <span className="glyphicon glyphicon-ok"/>
        </div>
    }

    render() {
        let placeholder = this.props.name

        if (this.props.placeholder) {
            placeholder = this.props.placeholder
        }

        return <div className="form-group">
            <label htmlFor={this.props.field} className="col-sm-2 control-label">{this.props.name}</label>
            <div className="col-sm-8">
                <input type={this.props.inputType} className="form-control" id={this.props.field}
                       name={this.props.field} placeholder={placeholder}
                       value={this.props.value.value}
                       onChange={this.handleChange}/>
            </div>
            {this.renderValid(this.props.value.valid)}
        </div>
    }
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    value: fieldPropTypes,
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
}

export class Form extends React.Component {
    render() {
        const personalia = this.props.personalia

        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Dine detaljer</h1>

                    <p>Alle felter nedenfor er påkrevd</p>
                </div>
            </div>

            <div className="row">
                <form className="form-horizontal" role="form">
                    <Input field="name" name="Navn" inputType="text" value={personalia.name}
                           onUpdate={this.props.onUpdate}/>
                    <Input field="address" name="Adresse" inputType="text" value={personalia.address}
                           onUpdate={this.props.onUpdate}/>
                    <Input field="postcode" name="Postnr" inputType="text" value={personalia.postcode}
                           onUpdate={this.props.onUpdate}/>
                    <Input field="town" name="Poststed" inputType="text" value={personalia.town}
                           onUpdate={this.props.onUpdate}/>
                    <Input field="telephone" name="Tlf/Mob" inputType="tel" value={personalia.telephone}
                           placeholder="Telefon eller mobil" onUpdate={this.props.onUpdate}/>
                    <Input field="email" name="E-post" inputType="email" value={personalia.email}
                           placeholder="E-post adresse" onUpdate={this.props.onUpdate}/>
                    <Input field="event" name="Formål" inputType="text" value={personalia.event}
                           placeholder="Hvilket arrangement" onUpdate={this.props.onUpdate}/>
                    <Input field="account" name="Kontonr" inputType="text" value={personalia.account}
                           placeholder="Hvor skal pengene overføres" onUpdate={this.props.onUpdate}/>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-2">
                            <Link className="btn btn-primary" to="/rows">Fortsett</Link>
                        </div>
                        <div className="col-sm-2">
                            <a className="btn btn-warning" onClick={() => this.props.onClear()}>Tøm feltene</a>
                        </div>
                        <div className="col-sm-6"></div>
                    </div>

                </form>
            </div>
        </div>
    }
}

Form.propTypes = {
    personalia: personaliaFormPropTypes,
    onUpdate: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        personalia: state.personalia
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (personalia) => {
            dispatch(updatePersonalia(personalia))
        },
        onClear: () => {
            dispatch(clearPersonalia())
        }
    }
}

const Personalia = connect(mapStateToProps, mapDispatchToProps)(Form)

export default Personalia
/* globals describe, it */

import React from 'react'
import {Form, Input, mapStateToProps} from '../../src/components/Personalia'
import {expect} from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import TestUtils from 'react-addons-test-utils'

import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils'

describe('components', () => {
    function emptyCallback1(x) {
    }

    function emptyCallback0() {
    }


    describe('Personlia', () => {
        describe('Input', () => {
            it('renders a text input', () => {

                let updateCalled = false
                let updateValue = 'Not called'

                function updateCallback(update) {
                    updateCalled = true
                    updateValue = update
                }

                const value = {
                    value: 'testValue',
                    valid: false
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="text" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={updateCallback}/>
                )

                const wrapper = scryRenderedDOMComponentsWithTag(component, 'div')
                expect(wrapper[0].className).to.contain('form-group')

                const label = findRenderedDOMComponentWithTag(component, 'label')
                expect(label.htmlFor).to.equal('testField')
                expect(label.className).to.contain('control-label')
                expect(label.textContent).to.equal('Test Field')

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('text')
                expect(input.className).to.contain('form-control')
                expect(input.id).to.equal('testField')
                expect(input.name).to.equal('testField')
                expect(input.placeholder).to.equal('testPlaceholder')

                input.value = 'newValue'
                Simulate.change(input)

                expect(updateCalled).to.equal(true)
                expect(updateValue).to.deep.equal({testField: {value: 'newValue'}})

            })

            it('renders an email input', () => {

                const value = {
                    value: 'name@domain.tld',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="email" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={emptyCallback1}/>
                )

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('email')
            })

            it('renders a telephone input', () => {

                const value = {
                    value: '+47 987 65 432',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="tel" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={emptyCallback1}/>
                )

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('tel')
            })

            it('renders an invalid input', () => {
                const value = {
                    value: 'testValue',
                    valid: false
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="text" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={emptyCallback1}/>
                )

                const validMarker = scryRenderedDOMComponentsWithClass(component, 'glyphicon')
                expect(validMarker.length).to.equal(0)
            })

            it('renders a valid input', () => {
                const value = {
                    value: 'testValue',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="text" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={emptyCallback1}/>
                )

                const validMarker = scryRenderedDOMComponentsWithClass(component, 'glyphicon')
                expect(validMarker.length).to.equal(1)
                expect(validMarker[0].className).to.contain('glyphicon-ok')
            })

            it('displays name as placeholder when missing placeholder', () => {
                const value = {
                    value: 'testValue',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="text" name="Test Field" value={value}
                           onUpdate={emptyCallback1}/>
                )

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('text')
                expect(input.className).to.contain('form-control')
                expect(input.id).to.equal('testField')
                expect(input.name).to.equal('testField')
                expect(input.placeholder).to.equal('Test Field')
            })
        })

        const emptyPersonalia = {
            name: {
                value: '',
                valid: false,
                validReason: ''
            },
            address: {
                value: '',
                valid: false,
                validReason: ''
            },
            postcode: {
                value: '',
                valid: false,
                validReason: ''
            },
            town: {
                value: '',
                valid: false,
                validReason: ''
            },
            telephone: {
                value: '',
                valid: false,
                validReason: ''
            },
            email: {
                value: '',
                valid: false,
                validReason: ''
            },
            event: {
                value: '',
                valid: false,
                validReason: ''
            },
            account: {
                value: '',
                valid: false,
                validReason: ''
            }
        }

        describe('Form', () => {
            it('creates the correct inputs', () => {
                const wrapper = shallow(<Form personalia={emptyPersonalia} onUpdate={emptyCallback1} onClear={emptyCallback0}/>)

                const inputs = wrapper.find(Input)

                expect(inputs).to.have.length(8)

                expect(inputs.contains(<Input field="name" name="Navn" inputType="text" value={emptyPersonalia.name} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="address" name="Adresse" inputType="text" value={emptyPersonalia.address} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="postcode" name="Postnr" inputType="text" value={emptyPersonalia.postcode} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="town" name="Poststed" inputType="text" value={emptyPersonalia.town} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="telephone" name="Tlf/Mob" placeholder="Telefon eller mobil" inputType="tel" value={emptyPersonalia.telephone} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="email" name="E-post" placeholder="E-post adresse" inputType="email" value={emptyPersonalia.email} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="event" name="Formål" placeholder="Hvilket arrangement" inputType="text" value={emptyPersonalia.event} onUpdate={emptyCallback1}/>)).to.equal(true)
                expect(inputs.contains(<Input field="account" name="Kontonr" placeholder="Hvor skal pengene overføres" inputType="text" value={emptyPersonalia.account} onUpdate={emptyCallback1}/>)).to.equal(true)
            })

            it('triggers the clear event', () => {
                const onButtonClick = sinon.spy()

                const wrapper = shallow(<Form personalia={emptyPersonalia} onUpdate={emptyCallback1} onClear={onButtonClick}/>)

                wrapper.find('a').simulate('click')

                expect(onButtonClick.calledOnce).to.equal(true)
            })
        })

        it('handles empty state', () => {
            const props = mapStateToProps({})

            expect(props).to.deep.equal({})
        })

        it('handles state with no personalia', () => {
            const props = mapStateToProps({
                dummy: {}
            })

            expect(props).to.deep.equal({})
        })

        it('maps state to correct props', () => {
            const props = mapStateToProps({
                personalia: emptyPersonalia
            })

            expect(props.personalia).to.deep.equal(emptyPersonalia)
        })
    })
})

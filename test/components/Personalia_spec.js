/* globals describe, it */

import React from 'react'
import {Form, Input} from '../../src/components/Personalia'
import {expect} from 'chai'

import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils'

describe('components', () => {
    describe('Personlia', () => {
        describe('Input', () => {
            function emptyCallback(x) {}

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

                const input = findRenderedDOMComponentWithTag(component,'input')
                expect(input.type).to.equal('text')
                expect(input.className).to.contain('form-control')
                expect(input.id).to.equal('testField')
                expect(input.name).to.equal('testField')
                expect(input.placeholder).to.equal('testPlaceholder')

                input.value = 'newValue'
                Simulate.change(input)

                expect(updateCalled).to.equal(true)
                expect(updateValue).to.deep.equal({ testField: { value: 'newValue' } })

            })

            it('renders an email input', () => {

                const value = {
                    value: 'name@domain.tld',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Input field="testField" inputType="email" name="Test Field" value={value}
                           placeholder="testPlaceholder"
                           onUpdate={emptyCallback}/>
                )

                const input = findRenderedDOMComponentWithTag(component,'input')
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
                           onUpdate={emptyCallback}/>
                )

                const input = findRenderedDOMComponentWithTag(component,'input')
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
                           onUpdate={emptyCallback}/>
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
                           onUpdate={emptyCallback}/>
                )

                const validMarker = scryRenderedDOMComponentsWithClass(component, 'glyphicon')
                expect(validMarker.length).to.equal(1)
                expect(validMarker[0].className).to.contain('glyphicon-ok')
            })
        })

    })
})


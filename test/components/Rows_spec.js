/* globals describe, it */

import React from 'react'
import {Form, Input, NumberInput, Row} from '../../src/components/Rows'
import {expect} from 'chai'

import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils'

describe('components', () => {
    describe('Row', () => {
        describe('Input', () => {
            it('renders a text input', () => {

                let updateCalled = false
                let updateValue = 'Not called'

                function updateCallback(update) {
                    updateCalled = true
                    updateValue = update
                }

                const component = renderIntoDocument(
                    <Input id={1} inputType="text" name="testField" value="testValue" placeholder="testPlaceholder"
                           onUpdate={updateCallback} width={2}/>
                )

                // Width
                const wrapper = findRenderedDOMComponentWithTag(component, 'div')
                expect(wrapper.className).to.equal('col-md-2')

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('text')
                expect(input.className).to.equal('form-control')
                expect(input.id).to.equal('testField_1')
                expect(input.name).to.equal('testField_1')
                expect(input.placeholder).to.equal('testPlaceholder')
                expect(input.value).to.equal('testValue')

                input.value = 'newValue'
                Simulate.change(input)

                expect(updateCalled).to.equal(true)
                expect(updateValue).to.deep.equal({id: 1, testField: 'newValue'})
            })

            it('renders a date input', () => {

                let updateCalled = false
                let updateValue = 'Not called'

                function updateCallback(update) {
                    updateCalled = true
                    updateValue = update
                }

                const component = renderIntoDocument(
                    <Input id={1} inputType="date" name="testField" value="2016-01-01" placeholder="testPlaceholder"
                           onUpdate={updateCallback} width={3}/>
                )

                // Width
                const wrapper = findRenderedDOMComponentWithTag(component, 'div')
                expect(wrapper.className).to.equal('col-md-3')

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('date')
                expect(input.className).to.equal('form-control')
                expect(input.id).to.equal('testField_1')
                expect(input.name).to.equal('testField_1')
                expect(input.placeholder).to.equal('testPlaceholder')
                expect(input.value).to.equal('2016-01-01')

                input.value = '2016-01-02'
                Simulate.change(input)

                expect(updateCalled).to.equal(true)
                expect(updateValue).to.deep.equal({id: 1, testField: '2016-01-02'})
            })
        })

        describe('NumberInput', () => {
            it('renders a numeric input', () => {

                let updateCalled = false
                let updateValue = 'Not called'

                function updateCallback(update) {
                    updateCalled = true
                    updateValue = update
                }

                const component = renderIntoDocument(
                    <NumberInput id={1} inputType="number" name="testField" value={1} placeholder="testPlaceholder"
                                 onUpdate={updateCallback} width={7}/>
                )

                // Width
                const wrapper = findRenderedDOMComponentWithTag(component, 'div')
                expect(wrapper.className).to.equal('col-md-7')

                const input = findRenderedDOMComponentWithTag(component, 'input')
                expect(input.type).to.equal('number')
                expect(input.className).to.equal('form-control')
                expect(input.id).to.equal('testField_1')
                expect(input.name).to.equal('testField_1')
                expect(input.placeholder).to.equal('testPlaceholder')
                expect(input.value).to.equal('1')
                expect(input.step).to.equal('0.01')
                expect(input.min).to.equal('0')

                input.value = 2
                Simulate.change(input)

                expect(updateCalled).to.equal(true)
                expect(updateValue).to.deep.equal({id: 1, testField: 2})
            })
        })

        describe('Row', () => {
            function updateCallback(update) {}

            it('renders a valid row', () => {
                const row = {
                    id: 1,
                    date: '2016-01-01',
                    description: 'testDescription',
                    cost: 12,
                    supplier: 'testSupplier',
                    valid: true
                }

                const component = renderIntoDocument(
                    <Row row={row} onUpdate={updateCallback} width={7}/>
                )

                const validMarker = scryRenderedDOMComponentsWithClass(component, 'glyphicon')

                expect(validMarker.length).to.equal(1)
                expect(validMarker[0].className).to.include('glyphicon-ok')
            })

            it('renders an invalid row', () => {
                const row = {
                    id: 1,
                    date: '2016-01-01',
                    description: 'testDescription',
                    cost: 12,
                    supplier: 'testSupplier',
                    valid: false
                }

                const component = renderIntoDocument(
                    <Row row={row} onUpdate={updateCallback} width={7}/>
                )

                const validMarker = scryRenderedDOMComponentsWithClass(component, 'glyphicon')

                expect(validMarker.length).to.equal(1)
                expect(validMarker[0].className).to.include('glyphicon-warning-sign')
            })
        })
    })
})

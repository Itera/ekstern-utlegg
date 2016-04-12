/* eslint-env mocha */

import React from 'react'
import {Home} from '../../src/components/Home'

import {renderIntoDocument, findRenderedDOMComponentWithClass} from 'react-addons-test-utils'

describe('components', () => {
    describe('Home', () => {
        it('renders a jumbotron', () => {
            const component = renderIntoDocument(
                <Home/>
            )

            findRenderedDOMComponentWithClass(component, 'jumbotron')
        })
    })
})

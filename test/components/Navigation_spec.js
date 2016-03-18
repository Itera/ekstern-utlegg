/* globals describe, it */

import React from 'react'
import Navigation from '../../src/components/Navigation'
import {expect} from 'chai'

import {renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'

describe('components', () => {
    describe('Navigation', () => {
        it('renders a nav', () => {
            const component = renderIntoDocument(
                <Navigation/>
            )

            findRenderedDOMComponentWithTag(component, 'nav')

            const links = scryRenderedDOMComponentsWithTag(component, 'a')
            expect(links.length).to.equal(4)
            expect(links[0].textContent).to.equal("Forklaring")
            expect(links[1].textContent).to.equal("Mine detaljer")
            expect(links[2].textContent).to.equal("Utlegg")
            expect(links[3].textContent).to.equal("Ferdig")
        })
    })
})

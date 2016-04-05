/* globals describe, it */

import {expect} from 'chai'

import reducer from '../../src/reducers/rows'
import {addRow,clearRows,updateRow} from '../../src/actions/rows'

describe('reducers', () => {
    describe('rows', () => {
        describe('clearRows', () => {
            it('returns initial state if no state present', () => {
                const state = reducer(undefined, clearRows())

                expect(state).to.deep.equal({
                    rows: [],
                    total: 0
                })
            })

            it('returns initial state with state present', () => {
                const state = reducer({
                    rows: [
                        1,
                        2,
                        3
                    ],
                    total: 120
                }, clearRows())

                expect(state).to.deep.equal({
                    rows: [],
                    total: 0
                })
            })
        })

        describe('addRow', () => {
            it('returns initial state plus one row if no state present', () => {
                const state = reducer(undefined, addRow())

                expect(state).to.deep.equal({
                    rows: [{
                        id: 0,
                        date: '',
                        description: '',
                        cost: 0,
                        supplier: '',
                        valid: false
                    }],
                    total: 0
                })
            })

            it('returns state plus one row with state present', () => {
                const state = reducer({
                    rows: [
                        1,
                        2,
                        3
                    ],
                    total: 120
                }, addRow())

                expect(state).to.deep.equal({
                    rows: [
                        1,
                        2,
                        3,
                        {
                            id: 1,
                            date: '',
                            description: '',
                            cost: 0,
                            supplier: '',
                            valid: false
                        }
                    ],
                    total: 120
                })
            })
        })
    })
})

/* eslint-env mocha */

import {expect} from 'chai'
import moment from 'moment'

import reducer from '../../src/reducers/rows'
import {addRow, clearRows, updateRow} from '../../src/actions/rows'

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

        describe('updateRow', () => {
            it('returns empty row set if no state present', () => {
                const state = reducer(undefined, updateRow({}))

                expect(state).to.deep.equal({
                    rows: [],
                    total: 0
                })
            })

            it('returns state untouched if row is not present', () => {
                const initialState = {
                    rows: [{
                        id: 1,
                        date: 'date',
                        description: 'desc',
                        cost: 10,
                        supplier: 'supplier',
                        valid: true
                    }],
                    total: 10
                }

                const state = reducer(initialState, updateRow({
                    id: 2,
                    date: 'date2',
                    description: 'desc2',
                    cost: 20,
                    supplier: 'supplier2'
                }))

                expect(state).to.deep.equal(initialState)
            })

            it('validates passed row', () => {
                const initialState = {
                    rows: [
                        {
                            id: 1,
                            date: 'date',
                            description: 'desc',
                            cost: 10,
                            supplier: 'supplier',
                            valid: true
                        },
                        {
                            id: 2,
                            date: 'date2',
                            description: 'desc2',
                            cost: 20,
                            supplier: 'supplier2',
                            valid: true
                        }
                    ],
                    total: 30
                }

                const state = reducer(initialState, updateRow({
                    id: 2,
                    date: '2010-01-01',
                    description: 'x',
                    cost: 30,
                    supplier: 'x'
                }))

                const earliest = moment().subtract(1, 'years').format('YYYY-MM-DD')

                expect(state).to.deep.equal({
                    rows: [
                        {
                            id: 1,
                            date: 'date',
                            description: 'desc',
                            cost: 10,
                            supplier: 'supplier',
                            valid: true
                        },
                        {
                            id: 2,
                            date: '2010-01-01',
                            description: 'x',
                            cost: 30,
                            supplier: 'x',
                            valid: false,
                            validReason: {
                                date: [
                                    `Date must be no earlier than ${earliest}`
                                ],
                                description: [
                                    'Description is too short (minimum is 2 characters)'
                                ],
                                supplier: [
                                    'Supplier is too short (minimum is 2 characters)'
                                ]
                            }
                        }
                    ],
                    total: 10
                })
            })
        })

        it('handles valid updates', () => {
            const initialState = {
                rows: [
                    {
                        id: 1,
                        date: 'date',
                        description: 'desc',
                        cost: 10,
                        supplier: 'supplier',
                        valid: true
                    },
                    {
                        id: 2,
                        date: 'date2',
                        description: 'desc2',
                        cost: 20,
                        supplier: 'supplier2',
                        valid: true
                    }
                ],
                total: 30
            }

            const lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD')

            const state = reducer(initialState, updateRow({
                id: 2,
                date: lastMonth,
                description: 'Updated desc',
                cost: 40,
                supplier: 'Updated supplier'
            }))

            expect(state).to.deep.equal({
                rows: [
                    {
                        id: 1,
                        date: 'date',
                        description: 'desc',
                        cost: 10,
                        supplier: 'supplier',
                        valid: true
                    },
                    {
                        id: 2,
                        date: lastMonth,
                        description: 'Updated desc',
                        cost: 40,
                        supplier: 'Updated supplier',
                        valid: true,
                        validReason: undefined
                    }
                ],
                total: 50
            })
        })
    })
})

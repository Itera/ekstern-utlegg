/* globals describe, it */

import {expect} from 'chai'

import reducer from '../../src/reducers/personalia'
import {clearPersonalia,updatePersonalia} from '../../src/actions/personalia'

describe('reducers', () => {
    describe('personalia', () => {
        describe('clearPersonalia', () => {
            it('returns initial state if no state present', () => {
                const state = reducer(undefined, clearPersonalia())

                expect(state).to.deep.equal({
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
                })
            })

            it('returns inital state with state present', () => {
                const state = reducer({
                    name: {
                        value: 'name',
                        valid: true,
                        validReason: undefined
                    }
                }, clearPersonalia())

                expect(state).to.deep.equal({
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
                })
            })
        })
    })
})
/* eslint-env mocha */

import {expect} from 'chai'

import reducer from '../../src/reducers/personalia'
import {clearPersonalia, updatePersonalia} from '../../src/actions/personalia'

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

        describe('updatePersonalia', () => {
            it('returns initial state if no state present', () => {
                const state = reducer(undefined, updatePersonalia({}))

                expect(state).to.deep.equal({
                    name: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    address: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    postcode: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    town: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    telephone: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    email: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    event: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    },
                    account: {
                        value: '',
                        valid: false,
                        validReason: [
                            'can\'t be blank'
                        ]
                    }
                })
            })

            it('performs validations', () => {
                const state = reducer(undefined, updatePersonalia({
                    name: {
                        value: 'x'
                    },
                    address: {
                        value: 'x'
                    },
                    postcode: {
                        value: 'x'
                    },
                    telephone: {
                        value: 'x'
                    },
                    town: {
                        value: 'x'
                    },
                    event: {
                        value: 'x'
                    },
                    account: {
                        value: 'x'
                    },
                    email: {
                        value: 'x'
                    }
                }))

                expect(state).to.deep.equal({
                    name: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is too short (minimum is 3 characters)'
                        ]
                    },
                    address: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is too short (minimum is 3 characters)'
                        ]
                    },
                    postcode: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is the wrong length (should be 4 characters)',
                            'is invalid'
                        ]
                    },
                    town: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is too short (minimum is 2 characters)'
                        ]
                    },
                    telephone: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is invalid'
                        ]
                    },
                    email: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is not a valid email'
                        ]
                    },
                    event: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is too short (minimum is 3 characters)'
                        ]
                    },
                    account: {
                        value: 'x',
                        valid: false,
                        validReason: [
                            'is invalid'
                        ]
                    }
                })
            })

            it('accepts valid data', () => {
                const state = reducer(undefined, updatePersonalia({
                    name: {
                        value: 'Alice'
                    },
                    address: {
                        value: 'Sognsveien 77b'
                    },
                    postcode: {
                        value: '0805'
                    },
                    telephone: {
                        value: '23007650'
                    },
                    town: {
                        value: 'Oslo'
                    },
                    event: {
                        value: 'Test'
                    },
                    account: {
                        value: '12345678901'
                    },
                    email: {
                        value: 'contact@itera.no'
                    }
                }))

                expect(state).to.deep.equal({
                    name: {
                        value: 'Alice',
                        valid: true,
                        validReason: undefined
                    },
                    address: {
                        value: 'Sognsveien 77b',
                        valid: true,
                        validReason: undefined
                    },
                    postcode: {
                        value: '0805',
                        valid: true,
                        validReason: undefined
                    },
                    telephone: {
                        value: '+47 23 00 76 50',
                        valid: true,
                        validReason: undefined
                    },
                    town: {
                        value: 'Oslo',
                        valid: true,
                        validReason: undefined
                    },
                    event: {
                        value: 'Test',
                        valid: true,
                        validReason: undefined
                    },
                    account: {
                        value: '1234.56.78901',
                        valid: true,
                        validReason: undefined
                    },
                    email: {
                        value: 'contact@itera.no',
                        valid: true,
                        validReason: undefined
                    }
                })
            })
        })
    })
})

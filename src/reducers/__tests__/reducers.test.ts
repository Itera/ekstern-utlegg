import { createStore } from 'redux';
import moment from 'moment';

import reducers from '../index';

import { clearPersonalia, updatePersonalia } from '../../actions/personalia';
import { addRow, clearRows, updateRow } from '../../actions/rows';

describe('reducers', () => {
  describe('personalia', () => {
    describe('clearPersonalia', () => {
      it('returns initial state if no state present', () => {
        const store = createStore(reducers);

        store.dispatch(clearPersonalia());

        const state = store.getState().personalia;

        expect(state).toEqual({
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
          dept: {
            value: '110 410',
            valid: true
          },
          account: {
            value: '',
            valid: false,
            validReason: ''
          }
        });
      });

      it('returns inital state with state present', () => {
        const store = createStore(reducers, {
          personalia: {
            name: {
              value: 'name',
              valid: true,
              validReason: undefined
            }
          }
        });

        store.dispatch(clearPersonalia());

        const state = store.getState().personalia;

        expect(state).toEqual({
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
          dept: {
            value: '110 410',
            valid: true
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
        });
      });
    });

    describe('updatePersonalia', () => {
      it('returns initial state if no state present', () => {
        const store = createStore(reducers);

        store.dispatch(updatePersonalia({}));

        const state = store.getState().personalia;

        expect(state).toEqual({
          account: { valid: false, validReason: ['is invalid'], value: '' },
          address: {
            valid: false,
            validReason: ['is too short (minimum is 3 characters)'],
            value: ''
          },
          dept: { valid: true, validReason: undefined, value: '110 410' },
          email: {
            valid: false,
            validReason: ['is not a valid email'],
            value: ''
          },
          event: {
            valid: false,
            validReason: ['is too short (minimum is 3 characters)'],
            value: ''
          },
          name: {
            valid: false,
            validReason: ['is too short (minimum is 3 characters)'],
            value: ''
          },
          postcode: {
            valid: false,
            validReason: [
              'is the wrong length (should be 4 characters)',
              'is invalid'
            ],
            value: ''
          },
          telephone: { valid: false, validReason: ['is invalid'], value: '' },
          town: {
            valid: false,
            validReason: ['is too short (minimum is 2 characters)'],
            value: ''
          }
        });
      });

      it('performs validations', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
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
            },
            dept: {
              value: '123'
            }
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
          name: {
            value: 'x',
            valid: false,
            validReason: ['is too short (minimum is 3 characters)']
          },
          address: {
            value: 'x',
            valid: false,
            validReason: ['is too short (minimum is 3 characters)']
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
            validReason: ['is too short (minimum is 2 characters)']
          },
          telephone: {
            value: 'x',
            valid: false,
            validReason: ['is invalid']
          },
          email: {
            value: 'x',
            valid: false,
            validReason: ['is not a valid email']
          },
          dept: {
            value: '123',
            valid: false,
            validReason: [
              'is the wrong length (should be 7 characters)',
              'is invalid'
            ]
          },
          event: {
            value: 'x',
            valid: false,
            validReason: ['is too short (minimum is 3 characters)']
          },
          account: {
            value: 'x',
            valid: false,
            validReason: ['is invalid']
          }
        });
      });

      it('accepts valid data', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
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
            },
            dept: {
              value: '123 456'
            }
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
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
          dept: {
            value: '123 456',
            valid: true,
            validReason: undefined
          },
          email: {
            value: 'contact@itera.no',
            valid: true,
            validReason: undefined
          }
        });
      });

      it('defaults dept', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
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
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
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
          dept: {
            value: '110 410',
            valid: true,
            validReason: undefined
          },
          email: {
            value: 'contact@itera.no',
            valid: true,
            validReason: undefined
          }
        });
      });
    });
  });

  describe('rows', () => {
    describe('clearRows', () => {
      it('returns initial state if no state present', () => {
        const store = createStore(reducers);

        store.dispatch(clearRows());

        const state = store.getState().rows;

        expect(state).toEqual({
          rows: [],
          total: 0
        });
      });

      it('returns initial state with state present', () => {
        const store = createStore(reducers, {
          rows: {
            rows: [1, 2, 3],
            total: 120
          }
        });

        store.dispatch(clearRows());

        const state = store.getState().rows;

        expect(state).toEqual({
          rows: [],
          total: 0
        });
      });
    });

    describe('addRow', () => {
      it('returns initial state plus one row if no state present', () => {
        const store = createStore(reducers);

        store.dispatch(addRow());

        const state = store.getState().rows;

        expect(state).toEqual({
          rows: [
            {
              id: 1,
              date: '',
              description: '',
              cost: 0,
              supplier: '',
              valid: false
            }
          ],
          total: 0
        });
      });

      it('returns state plus one row with state present', () => {
        const store = createStore(reducers, {
          rows: {
            rows: [1, 2, 3],
            total: 120
          }
        });

        store.dispatch(addRow());

        const state = store.getState().rows;

        expect(state).toEqual({
          rows: [
            1,
            2,
            3,
            {
              id: 4,
              date: '',
              description: '',
              cost: 0,
              supplier: '',
              valid: false
            }
          ],
          total: 120
        });
      });
    });

    describe('updateRow', () => {
      it('returns empty row set if no state present', () => {
        const store = createStore(reducers);

        store.dispatch(updateRow());

        const state = store.getState().rows;

        expect(state).toEqual({
          rows: [],
          total: 0
        });
      });

      it('returns state untouched if row is not present', () => {
        const initialState = {
          rows: [
            {
              id: 1,
              date: 'date',
              description: 'desc',
              cost: 10,
              supplier: 'supplier',
              valid: true
            }
          ],
          total: 10
        };

        const store = createStore(reducers, { rows: initialState });

        store.dispatch(
          updateRow({
            id: 2,
            date: 'date2',
            description: 'desc2',
            cost: 20,
            supplier: 'supplier2'
          })
        );

        const state = store.getState().rows;

        expect(state).toEqual(initialState);
      });

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
        };

        const store = createStore(reducers, { rows: initialState });

        store.dispatch(
          updateRow({
            id: 2,
            date: '2010-01-01',
            description: 'x',
            cost: 30,
            supplier: 'x'
          })
        );

        const state = store.getState().rows;

        const earliest = moment()
          .subtract(1, 'years')
          .format('YYYY-MM-DD');

        expect(state).toEqual({
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
                date: [`Date must be no earlier than ${earliest}`],
                description: [
                  'Description is too short (minimum is 2 characters)'
                ],
                supplier: ['Supplier is too short (minimum is 2 characters)']
              }
            }
          ],
          total: 10
        });
      });
    });

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
      };

      const lastMonth = moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD');

      const store = createStore(reducers, { rows: initialState });

      store.dispatch(
        updateRow({
          id: 2,
          date: lastMonth,
          description: 'Updated desc',
          cost: 40,
          supplier: 'Updated supplier'
        })
      );

      const state = store.getState().rows;

      expect(state).toEqual({
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
      });
    });
  });
});

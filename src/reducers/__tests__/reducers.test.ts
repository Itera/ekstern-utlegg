import { createStore } from 'redux';
import moment from 'moment';

import reducers from '../index';

import { clearPersonalia, updatePersonalia } from '../../actions/personalia';
import { addRow, clearRows, updateRow, deleteRow } from '../../actions/rows';

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
            validReason: '',
            dirty: false
          },
          address: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          postcode: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          town: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          telephone: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          email: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          event: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          dept: {
            value: '110 410',
            valid: true,
            dirty: false
          },
          account: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
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
            validReason: '',
            dirty: false
          },
          address: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          postcode: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          town: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          telephone: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          email: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          dept: {
            value: '110 410',
            valid: true,
            dirty: false
          },
          event: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
          },
          account: {
            value: '',
            valid: false,
            validReason: '',
            dirty: false
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
          account: {
            valid: false,
            validReason: ['må være 11 siffer'],
            value: '',
            dirty: false
          },
          address: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: '',
            dirty: false
          },
          dept: {
            valid: true,
            validReason: undefined,
            value: '110 410',
            dirty: false
          },
          email: {
            valid: false,
            validReason: ['må være en epost adresse'],
            value: '',
            dirty: false
          },
          event: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: '',
            dirty: false
          },
          name: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: '',
            dirty: false
          },
          postcode: {
            valid: false,
            validReason: ['må være 4 siffer'],
            value: '',
            dirty: false
          },
          telephone: {
            valid: false,
            validReason: ['må være en norsk telefonnummer'],
            value: '',
            dirty: false
          },
          town: {
            valid: false,
            validReason: ['må være minst 2 tegn'],
            value: '',
            dirty: false
          }
        });
      });

      it('performs validations', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
            name: {
              value: 'x',
              dirty: true
            },
            address: {
              value: 'x',
              dirty: true
            },
            postcode: {
              value: 'x',
              dirty: true
            },
            telephone: {
              value: 'x',
              dirty: true
            },
            town: {
              value: 'x',
              dirty: true
            },
            event: {
              value: 'x',
              dirty: true
            },
            account: {
              value: 'x',
              dirty: true
            },
            email: {
              value: 'x',
              dirty: true
            },
            dept: {
              value: '123',
              dirty: true
            }
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
          account: {
            valid: false,
            validReason: ['må være 11 siffer'],
            value: 'x',
            dirty: true
          },
          address: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: 'x',
            dirty: true
          },
          dept: {
            valid: false,
            validReason: [
              'is the wrong length (should be 7 characters)',
              'is invalid'
            ],
            value: '123',
            dirty: true
          },
          email: {
            valid: false,
            validReason: ['må være en epost adresse'],
            value: 'x',
            dirty: true
          },
          event: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: 'x',
            dirty: true
          },
          name: {
            valid: false,
            validReason: ['må være minst 3 tegn'],
            value: 'x',
            dirty: true
          },
          postcode: {
            valid: false,
            validReason: ['må være 4 siffer'],
            value: 'x',
            dirty: true
          },
          telephone: {
            valid: false,
            validReason: ['må være en norsk telefonnummer'],
            value: 'x',
            dirty: true
          },
          town: {
            valid: false,
            validReason: ['må være minst 2 tegn'],
            value: 'x',
            dirty: true
          }
        });
      });

      it('accepts valid data', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
            name: {
              value: 'Alice',
              dirty: true
            },
            address: {
              value: 'Sognsveien 77b',
              dirty: true
            },
            postcode: {
              value: '0805',
              dirty: true
            },
            telephone: {
              value: '23007650',
              dirty: true
            },
            town: {
              value: 'Oslo',
              dirty: true
            },
            event: {
              value: 'Test',
              dirty: true
            },
            account: {
              value: '12345678901',
              dirty: true
            },
            email: {
              value: 'contact@itera.no',
              dirty: true
            },
            dept: {
              value: '123 456',
              dirty: true
            }
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
          name: {
            value: 'Alice',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          address: {
            value: 'Sognsveien 77b',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          postcode: {
            value: '0805',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          telephone: {
            value: '+47 23 00 76 50',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          town: {
            value: 'Oslo',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          event: {
            value: 'Test',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          account: {
            value: '1234.56.78901',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          dept: {
            value: '123 456',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          email: {
            value: 'contact@itera.no',
            valid: true,
            validReason: undefined,
            dirty: false
          }
        });
      });

      it('defaults dept', () => {
        const store = createStore(reducers);

        store.dispatch(
          updatePersonalia({
            name: {
              value: 'Alice',
              dirty: true
            },
            address: {
              value: 'Sognsveien 77b',
              dirty: true
            },
            postcode: {
              value: '0805',
              dirty: true
            },
            telephone: {
              value: '23007650',
              dirty: true
            },
            town: {
              value: 'Oslo',
              dirty: true
            },
            event: {
              value: 'Test',
              dirty: true
            },
            account: {
              value: '12345678901',
              dirty: true
            },
            email: {
              value: 'contact@itera.no',
              dirty: true
            }
          })
        );

        const state = store.getState().personalia;

        expect(state).toEqual({
          name: {
            value: 'Alice',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          address: {
            value: 'Sognsveien 77b',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          postcode: {
            value: '0805',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          telephone: {
            value: '+47 23 00 76 50',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          town: {
            value: 'Oslo',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          event: {
            value: 'Test',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          account: {
            value: '1234.56.78901',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          dept: {
            value: '110 410',
            valid: true,
            validReason: undefined,
            dirty: false
          },
          email: {
            value: 'contact@itera.no',
            valid: true,
            validReason: undefined,
            dirty: false
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
              valid: false,
              dirty: false
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
              valid: false,
              dirty: false
            }
          ],
          total: 120
        });
      });
    });

    describe('updateRow', () => {
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
                date: ['må være en gyldig dato som ikke er i fremtid'],
                description: ['må være minst 2 tegn'],
                supplier: ['må være minst 2 tegn']
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
            valid: true,
            dirty: false
          },
          {
            id: 2,
            date: 'date2',
            description: 'desc2',
            cost: 20,
            supplier: 'supplier2',
            valid: true,
            dirty: false
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
          supplier: 'Updated supplier',
          dirty: true
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
            valid: true,
            dirty: false
          },
          {
            id: 2,
            date: lastMonth,
            description: 'Updated desc',
            cost: 40,
            supplier: 'Updated supplier',
            valid: true,
            validReason: undefined,
            dirty: false
          }
        ],
        total: 50
      });
    });

    it('handles deletion where row is found', () => {
      const initialState = {
        rows: [
          {
            id: 1,
            date: 'date',
            description: 'desc',
            cost: 10,
            supplier: 'supplier',
            valid: true,
            dirty: false
          },
          {
            id: 2,
            date: 'date2',
            description: 'desc2',
            cost: 20,
            supplier: 'supplier2',
            valid: true,
            dirty: false
          },
          {
            id: 3,
            date: 'date3',
            description: 'desc3',
            cost: 30,
            supplier: 'supplier3',
            valid: true,
            dirty: false
          }
        ],
        total: 60
      };

      const store = createStore(reducers, { rows: initialState });

      store.dispatch(deleteRow(2));

      const state = store.getState().rows;

      expect(state).toEqual({
        rows: [
          {
            id: 1,
            date: 'date',
            description: 'desc',
            cost: 10,
            supplier: 'supplier',
            valid: true,
            dirty: false
          },
          {
            id: 3,
            date: 'date3',
            description: 'desc3',
            cost: 30,
            supplier: 'supplier3',
            valid: true,
            dirty: false
          }
        ],
        total: 40
      });
    });

    it('handles deletion where no row is found', () => {
      const initialState = {
        rows: [
          {
            id: 1,
            date: 'date',
            description: 'desc',
            cost: 10,
            supplier: 'supplier',
            valid: true,
            dirty: false
          },
          {
            id: 2,
            date: 'date2',
            description: 'desc2',
            cost: 20,
            supplier: 'supplier2',
            valid: true,
            dirty: false
          },
          {
            id: 3,
            date: 'date3',
            description: 'desc3',
            cost: 30,
            supplier: 'supplier3',
            valid: true,
            dirty: false
          }
        ],
        total: 60
      };

      const store = createStore(reducers, { rows: initialState });

      store.dispatch(deleteRow(7));

      const state = store.getState().rows;

      expect(state).toEqual({
        rows: [
          {
            id: 1,
            date: 'date',
            description: 'desc',
            cost: 10,
            supplier: 'supplier',
            valid: true,
            dirty: false
          },
          {
            id: 2,
            date: 'date2',
            description: 'desc2',
            cost: 20,
            supplier: 'supplier2',
            valid: true,
            dirty: false
          },
          {
            id: 3,
            date: 'date3',
            description: 'desc3',
            cost: 30,
            supplier: 'supplier3',
            valid: true,
            dirty: false
          }
        ],
        total: 60
      });
    });
  });
});

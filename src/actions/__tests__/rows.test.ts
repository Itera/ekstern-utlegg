import { addRow, clearRows, updateRow } from '../rows';
import { RowFieldProps } from '../../types';

describe('actions', () => {
  describe('rows', () => {
    describe('updateRow', () => {
      it('handles empty object', () => {
        const row: RowFieldProps = { id: 1 };

        const action = updateRow(row);

        expect(action).toEqual({
          type: 'UPDATE_ROW',
          row: row
        });
      });

      it('handles object', () => {
        const row: RowFieldProps = {
          cost: 12,
          description: 'Test description',
          id: 1,
          date: undefined,
          supplier: 'Test supplier',
          valid: true,
          validReason: undefined
        };

        const action = updateRow(row);

        expect(action).toEqual({
          type: 'UPDATE_ROW',
          row: row
        });
      });
    });

    describe('clearRows', () => {
      it('creates a clear action', () => {
        const action = clearRows();

        expect(action).toEqual({
          type: 'CLEAR_ROWS'
        });
      });
    });

    describe('addRow', () => {
      it('creates an add action', () => {
        const action = addRow();

        expect(action).toEqual({
          type: 'ADD_ROW'
        });
      });
    });
  });
});

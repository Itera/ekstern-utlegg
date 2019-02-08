import { AddRow, ClearRows, RowFieldProps, UpdateRow } from '../types';

export const addRow: AddRow = () => ({
  type: 'ADD_ROW'
});

export const clearRows: ClearRows = () => ({
  type: 'CLEAR_ROWS'
});

export const updateRow: UpdateRow = (row: RowFieldProps) => ({
  type: 'UPDATE_ROW',
  row
});

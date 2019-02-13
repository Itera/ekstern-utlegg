import {
  AddRow,
  ClearRows,
  RowFieldProps,
  UpdateRow,
  DeleteRow
} from '../types';

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

export const deleteRow: DeleteRow = (id: number) => ({
  type: 'DELETE_ROW',
  id
});

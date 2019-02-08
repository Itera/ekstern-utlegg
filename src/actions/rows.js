export const addRow = () => ({
  type: 'ADD_ROW'
});

export const clearRows = () => ({
  type: 'CLEAR_ROWS'
});

export const updateRow = row => ({
  type: 'UPDATE_ROW',
  row
});

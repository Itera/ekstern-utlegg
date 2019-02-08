import {
  ClearPersonalia,
  PersonaliaFormProps,
  UpdatePersonalia
} from '../types';

export const updatePersonalia: UpdatePersonalia = (
  personalia: PersonaliaFormProps
) => ({
  type: 'UPDATE_PERSONALIA',
  personalia
});

export const clearPersonalia: ClearPersonalia = () => ({
  type: 'CLEAR_PERSONALIA'
});

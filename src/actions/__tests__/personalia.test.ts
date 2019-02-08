import { clearPersonalia, updatePersonalia } from '../personalia';
import { FieldProps, PersonaliaFormProps } from '../../types';

describe('actions', () => {
  describe('personlia', () => {
    describe('updatePersonalia', () => {
      it('handles empty object', () => {
        const personalia: PersonaliaFormProps = {};

        const action = updatePersonalia(personalia);

        expect(action).toEqual({
          type: 'UPDATE_PERSONALIA',
          personalia: personalia
        });
      });

      it('handles object', () => {
        const personalia: PersonaliaFormProps = {
          account: { value: '12345678901' } as FieldProps,
          name: { value: 'Test Name' } as FieldProps,
          address: { value: 'Test address' } as FieldProps,
          dept: { value: 'Test dept' } as FieldProps,
          email: { value: 'test@email.tld' } as FieldProps,
          event: { value: 'Test event' } as FieldProps,
          postcode: { value: '1234' } as FieldProps,
          telephone: { value: '98765432' } as FieldProps,
          town: { value: 'Test town' } as FieldProps
        };

        const action = updatePersonalia(personalia);

        expect(action).toEqual({
          type: 'UPDATE_PERSONALIA',
          personalia: personalia
        });
      });
    });

    describe('clearPersonalia', () => {
      it('creates a clear action', () => {
        const action = clearPersonalia();

        expect(action).toEqual({
          type: 'CLEAR_PERSONALIA'
        });
      });
    });
  });
});

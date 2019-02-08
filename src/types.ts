export interface FieldProps {
  value: string;
  validReason?: string | string[];
  valid?: boolean;
}

export interface PersonaliaFormProps {
  name?: FieldProps;
  address?: FieldProps;
  postcode?: FieldProps;
  town?: FieldProps;
  telephone?: FieldProps;
  email?: FieldProps;
  event?: FieldProps;
  account?: FieldProps;
  dept?: FieldProps;
}

export interface RowFieldProps {
  id: number;
  date?: string;
  description?: string;
  cost?: number;
  supplier?: string;
  valid?: boolean;
  validReason?: {
    date: string[];
    description: string[];
    supplier: string[];
    cost: string[];
  };
}

export interface RowsFormProps {
  rows: RowFieldProps[];
  total: number;
}

export interface Action {
  type: string;
}

export interface UpdatePersonaliaAction extends Action {
  personalia: PersonaliaFormProps;
}

export type UpdatePersonalia = (
  personalia: PersonaliaFormProps
) => UpdatePersonaliaAction;

export type ClearPersonalia = () => Action;

export interface UpdateRowAction extends Action {
  row: RowFieldProps;
}

export type UpdateRow = (personalia: RowFieldProps) => UpdateRowAction;

export type AddRow = () => Action;

export type ClearRows = () => Action;

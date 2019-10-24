import { Dispatch } from "react";

export type ActionType =
  | { type: "clear_person" }
  | { type: "update_person"; person: Person }
  | { type: "clear_rows" }
  | { type: "add_row" }
  | { type: "update_row"; row: Row };

export type DeptType = "110 410" | "110 420" | "110 460";

export type Dept = {
  value: DeptType;
  name: string;
};

export const depts: Dept[] = [
  {
    value: "110 410",
    name: "Teknologi"
  },
  {
    value: "110 420",
    name: "Prosjekt- og Testledelse"
  },
  {
    value: "110 460",
    name: "DBX"
  }
];

export type Person = {
  name: string;
  address: string;
  postcode: string;
  town: string;
  tel: string;
  email: string;
  event: string;
  dept: DeptType;
  account: string;
};

export type Row = {
  id: number;
  date: Date;
  company: string;
  description: string;
  amount: number;
  valid?: boolean;
};

export type StateType = {
  person: Person;
  rows: Row[];
  total?: number;
};

export type Page = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

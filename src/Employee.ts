import * as t from 'io-ts';
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable';

const EmployeeBase = t.type({
  id: t.Int,
  firstName: t.string,
  lastName: t.string,
  nickname: optionFromNullable(t.string),
}, 'EmployeeBase');

const EmployeeBossOf = t.partial({
  bossOf: t.array(t.Int),
}, 'EmployeeBossOf');

export const Employee = t.intersection([
  EmployeeBase,
  EmployeeBossOf,
], 'Employee');

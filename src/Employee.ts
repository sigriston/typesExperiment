import * as t from 'io-ts';

const EmployeeBase = t.type({
  id: t.Int,
  firstName: t.string,
  lastName: t.string,
}, 'EmployeeBase');

const EmployeeBossOf = t.partial({
  bossOf: t.array(t.Int),
}, 'EmployeeBossOf');

export const Employee = t.intersection([
  EmployeeBase,
  EmployeeBossOf,
], 'Employee');

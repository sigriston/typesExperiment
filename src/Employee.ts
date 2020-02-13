import * as t from 'io-ts';

export const Employee = t.type({
  id: t.number,
  firstName: t.string,
  lastName: t.string,
}, 'Employee');

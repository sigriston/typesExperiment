import { either, isRight } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { Employee } from '../Employee';

describe('Employee', () => {
  it('should recognize a valid employee', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
      lastName: 'de Tal',
    };

    const employee = Employee.decode(data);

    expect(isRight(employee)).toBe(true);
  });

  it('should fail on a missing field', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
    };

    const employee = Employee.decode(data);

    expect(isRight(employee)).toBe(false);
    console.log(PathReporter.report(employee));
  });

  it('should accept an unknown field', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
      lastName: 'de Tal',
      xabl: 'asdlkfh',
    };

    const employee = Employee.decode(data);

    expect(isRight(employee)).toBe(true);
  });

  it('should allow access of an unknown field', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
      lastName: 'de Tal',
      xabl: 'asdlkfh',
    };

    const employee = Employee.decode(data);

    either.map(employee, e => {
      expect(e).toHaveProperty('xabl');
    });
  });
});

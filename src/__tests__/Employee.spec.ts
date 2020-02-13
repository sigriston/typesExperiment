import { either, isRight, right } from 'fp-ts/lib/Either';
import { none, some } from 'fp-ts/lib/Option';
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
  });

  it('should report a human-readable error', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
    };

    const employee = Employee.decode(data);

    expect(PathReporter.report(employee).join('')).toEqual(
      'Invalid value undefined supplied to : Employee/0: EmployeeBase/lastName: string'
    );
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

  it('should produce a undefined bossOf if absent', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
      lastName: 'de Tal',
    };

    const employee = Employee.decode(data);

    either.map(employee, e => {
      expect(e.bossOf).not.toBeDefined();
    });
  });

  it('should produce a defined bossOf if present', () => {
    const data = {
      id: 31337,
      firstName: 'Fulano',
      lastName: 'de Tal',
      bossOf: [ 23454, 98728, 547365 ],
    };

    const employee = Employee.decode(data);

    either.map(employee, e => {
      expect(e.bossOf).toEqual(data.bossOf);
    });
  });
});

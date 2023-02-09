import Helper from '@ember/component/helper';

export default class BsEqHelper extends Helper<{
  Args: {
    Positional: [value1: unknown, value2: unknown];
  };
  Return: boolean;
}> {}

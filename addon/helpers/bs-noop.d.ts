import Helper from '@ember/component/helper';

export default class BsNoopHelper extends Helper<{
  Args: {
    Positional: [];
  };
  Return: () => unknown;
}> {}

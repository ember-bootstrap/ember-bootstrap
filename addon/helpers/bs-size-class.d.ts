import Helper from '@ember/component/helper';

export default class BsSizeClassHelper extends Helper<{
  Args: {
    Positional: [prefix: string, size?: string | null];
    Named: { default: string } | undefined;
  };
  Return: string | null;
}> {}

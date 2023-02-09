import Helper from '@ember/component/helper';

export default class BsTypeClassHelper extends Helper<{
  Args: {
    Positional: [prefix: string, type?: string | null];
    Named: { default: string; outline?: boolean } | undefined;
  };
  Return: string | null;
}> {}

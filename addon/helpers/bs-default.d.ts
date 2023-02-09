import Helper from '@ember/component/helper';

export default class BsDefaultHelper<T1 = unknown, T2 = unknown> extends Helper<{
  Args: {
    Positional: [value: T1, defaultValue: T2];
  };
  Return: T1 extends undefined | null ? T2 : T1;
}> {}

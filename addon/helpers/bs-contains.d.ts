import Helper from '@ember/component/helper';

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export default class BsContainsHelper<A extends readonly unknown[] = []> extends Helper<{
  Args: {
    Positional: [arr: A, searchElement: ArrayElement<A>];
  };
  Return: boolean;
}> {}

import Helper from '@ember/component/helper';

export default class BsFormHorizInputClassHelper extends Helper<{
  Args: {
    Positional: [horizontalLabelGridClass: string | undefined];
  };
  Return: string | undefined;
}> {}

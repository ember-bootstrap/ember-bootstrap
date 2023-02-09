import Helper from '@ember/component/helper';

export default class BsFormHorizOffsetClassHelper extends Helper<{
  Args: {
    Positional: [horizontalLabelGridClass: string | undefined];
  };
  Return: string | undefined;
}> {}

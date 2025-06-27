import templateOnly from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface HorizontalCheckboxSignature {
  Args: {
    controlType?: string;
    errorsComponent?: ComponentLike;
    helpTextComponent: ComponentLike;
    horizontalLabelGridClass?: string;
    labelComponent: ComponentLike;
  };
  Blocks: {
    default: [];
  };
}

export default templateOnly<HorizontalCheckboxSignature>();

import templateOnly from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface VerticalCheckboxSignature {
  Args: {
    controlType?: string;
    errorsComponent?: ComponentLike;
    helpTextComponent: ComponentLike;
    labelComponent: ComponentLike;
  };
  Blocks: {
    default: [];
  };
}

export default templateOnly<VerticalCheckboxSignature>();

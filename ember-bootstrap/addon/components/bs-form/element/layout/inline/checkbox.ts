import templateOnly from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface InlineCheckboxSignature {
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

export default templateOnly<InlineCheckboxSignature>();

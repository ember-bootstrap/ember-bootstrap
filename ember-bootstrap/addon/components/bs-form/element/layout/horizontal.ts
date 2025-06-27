import type { ComponentLike } from '@glint/template';
import templateOnly from '@ember/component/template-only';

interface HorizontalLayoutSignature {
  Args: {
    errorsComponent: ComponentLike;
    hasLabel: boolean;
    helpTextComponent: ComponentLike;
    horizontalLabelGridClass?: string;
    labelComponent: ComponentLike<{ Args: { labelClass?: string } }>;
  };
  Blocks: {
    default: [];
  };
}

export default templateOnly<HorizontalLayoutSignature>();

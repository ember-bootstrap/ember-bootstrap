import type { ComponentLike } from '@glint/template';
import templateOnly from '@ember/component/template-only';

interface InlineLayoutSignature {
  Args: {
    errorsComponent: ComponentLike;
    hasLabel: boolean;
    helpTextComponent: ComponentLike;
    labelComponent: ComponentLike;
  };
  Blocks: {
    default: [];
  };
}

export default templateOnly<InlineLayoutSignature>();

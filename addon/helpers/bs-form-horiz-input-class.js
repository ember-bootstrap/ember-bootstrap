import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';

export default helper(function bsFormHorizInputClass([horizontalLabelGridClass] /*, named*/) {
  if (isBlank(horizontalLabelGridClass)) {
    return undefined;
  }
  let parts = horizontalLabelGridClass.split('-');
  assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
  parts[2] = 12 - parts[2];
  return parts.join('-');
});

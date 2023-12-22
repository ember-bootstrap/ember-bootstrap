import { helper } from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export default helper(function bsFormHorizOffsetClass(
  [horizontalLabelGridClass] /*, named*/,
) {
  if (isBlank(horizontalLabelGridClass)) {
    return undefined;
  }
  let originalClasses = horizontalLabelGridClass.split(' ');
  let offsetClasses = originalClasses.map((originalClass) => {
    let parts = originalClass.split('-');
    parts.splice(0, 1, 'offset');

    return parts.join('-');
  });

  return offsetClasses.join(' ');
});

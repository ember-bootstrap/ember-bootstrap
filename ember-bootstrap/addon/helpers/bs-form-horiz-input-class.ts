import { assert } from '@ember/debug';
import { isBlank, isNone } from '@ember/utils';

export default function bsFormHorizInputClass(
  horizontalLabelGridClass?: string,
) {
  if (isNone(horizontalLabelGridClass) || isBlank(horizontalLabelGridClass)) {
    return undefined;
  }

  const originalClasses = horizontalLabelGridClass.split(' ');
  const inputClasses = originalClasses.map((originalClass) => {
    const parts = originalClass.split('-');
    assert(
      'horizontalInputGridClass must match format bootstrap grid column class',
      parts.length === 3,
    );
    parts[2] = `${12 - parseInt(parts[2]!)}`;
    return parts.join('-');
  });

  return inputClasses.join(' ');
}

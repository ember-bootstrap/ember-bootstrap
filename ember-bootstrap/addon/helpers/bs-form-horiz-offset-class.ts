import { isBlank, isNone } from '@ember/utils';

export default function bsFormHorizOffsetClass(
  horizontalLabelGridClass?: string,
) {
  if (isNone(horizontalLabelGridClass) || isBlank(horizontalLabelGridClass)) {
    return undefined;
  }
  const originalClasses = horizontalLabelGridClass.split(' ');
  const offsetClasses = originalClasses.map((originalClass) => {
    const parts = originalClass.split('-');
    parts.splice(0, 1, 'offset');

    return parts.join('-');
  });

  return offsetClasses.join(' ');
}

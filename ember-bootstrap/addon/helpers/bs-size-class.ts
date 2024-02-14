import { helper } from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export function sizeClassHelper(
  [prefix, size]: [string, string | undefined | null],
  { default: defaultValue }: { default?: string },
) {
  size = size ?? defaultValue;
  return isBlank(size) ? null : `${prefix}-${size}`;
}

export default helper(sizeClassHelper);

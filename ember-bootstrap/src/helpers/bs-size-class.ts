import { isBlank } from '@ember/utils';

export default function sizeClassHelper(
  prefix: string,
  size: string | undefined | null,
  options: { default?: string },
) {
  size = size ?? options.default;
  return isBlank(size) ? null : `${prefix}-${size}`;
}

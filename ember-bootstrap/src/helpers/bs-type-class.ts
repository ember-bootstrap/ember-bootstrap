import { helper } from '@ember/component/helper';

export function typeClassHelper(
  [prefix, type]: [string, string | undefined | null],
  {
    default: defaultValue,
    outline = false,
  }: { default?: string; outline?: boolean },
) {
  type = type ?? defaultValue;
  if (outline) {
    return `${prefix}-outline-${type}`;
  }
  return `${prefix}-${type}`;
}

export default helper(typeClassHelper);

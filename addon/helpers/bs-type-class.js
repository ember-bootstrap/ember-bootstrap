import { helper } from '@ember/component/helper';

export function typeClassHelper([prefix, type], { default: defaultValue, outline = false }) {
  type = type ?? defaultValue;
  if (outline) {
    return `${prefix}-outline-${type}`;
  }
  return `${prefix}-${type}`;
}

export default helper(typeClassHelper);

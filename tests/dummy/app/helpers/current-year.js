import { helper } from '@ember/component/helper';

export function currentYear() {
  return new Date().getFullYear();
}

export default helper(currentYear);

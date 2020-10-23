import { helper } from '@ember/component/helper';

const noop = () => {};

export function bsNoop() {
  return noop;
}

export default helper(bsNoop);

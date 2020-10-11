import { helper } from '@ember/component/helper';

const noop = () => {};

export function bsActionFallback(params) {
  return params[0] ?? noop;
}

export default helper(bsActionFallback);

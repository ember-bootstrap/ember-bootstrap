import { helper } from '@ember/component/helper';
import { A, isArray } from '@ember/array';

export function bsContains(params /* , hash*/) {
  return isArray(params[0]) ? A(params[0]).includes(params[1]) : false;
}

export default helper(bsContains);

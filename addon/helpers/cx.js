import { helper } from '@ember/component/helper';

/**
 * Meant for joining classes together */
export default helper(function cx(classNames) {
  return classNames.join(' ');
});

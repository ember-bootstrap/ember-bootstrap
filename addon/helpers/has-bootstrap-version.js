import { helper } from '@ember/component/helper';
import hasBootstrapVersion from '../utils/has-bootstrap-version';

export default helper(function hasBootstrapVersionHelper([requiredVersion]) {
  return hasBootstrapVersion(requiredVersion);
});

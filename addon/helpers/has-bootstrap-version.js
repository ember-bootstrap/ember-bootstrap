import { helper } from '@ember/component/helper';
import { hasBootstrapVersion } from 'ember-bootstrap/compatibility-helpers';

export default helper(function hasBootstrapVersionHelper([requiredVersion]) {
  return hasBootstrapVersion(requiredVersion);
});

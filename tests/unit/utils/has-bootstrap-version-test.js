import hasBootstrapVersion from 'dummy/utils/has-bootstrap-version';
import { module } from 'qunit';
import { testBS3, testBS4 } from '../../helpers/bootstrap-test';

module('Unit | Utility | hasBootstrapVersion', function() {

  testBS3('it works', function(assert) {
    assert.ok(hasBootstrapVersion(3));
    assert.notOk(hasBootstrapVersion(4));
  });

  testBS4('it works', function(assert) {
    assert.ok(hasBootstrapVersion(4));
    assert.notOk(hasBootstrapVersion(3));
  });
});

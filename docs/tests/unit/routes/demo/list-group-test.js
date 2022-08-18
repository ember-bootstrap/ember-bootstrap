import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | demo/list-group', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:demo/list-group');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | getting started/setup', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /getting-started/setup', async function (assert) {
    await visit('/getting-started/setup');

    assert.equal(currentURL(), '/getting-started/setup');
  });
});

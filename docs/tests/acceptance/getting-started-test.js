import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | getting started', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /getting-started', async function (assert) {
    await visit('/getting-started');

    assert.equal(currentURL(), '/getting-started');
  });
});

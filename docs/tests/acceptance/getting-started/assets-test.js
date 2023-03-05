import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | getting started/assets', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /getting-started/assets', async function (assert) {
    await visit('/getting-started/assets');

    assert.equal(currentURL(), '/getting-started/assets');
  });
});

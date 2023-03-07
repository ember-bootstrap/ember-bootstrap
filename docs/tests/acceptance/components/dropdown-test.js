import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/dropdown', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/dropdown', async function (assert) {
    await visit('/components/dropdown');

    assert.equal(currentURL(), '/components/dropdown');
  });
});

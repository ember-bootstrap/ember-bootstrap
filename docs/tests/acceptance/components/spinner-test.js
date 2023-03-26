import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/spinner', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/spinner', async function (assert) {
    await visit('/components/spinner');

    assert.equal(currentURL(), '/components/spinner');
  });
});

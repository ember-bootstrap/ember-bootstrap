import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/popover', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/popover', async function (assert) {
    await visit('/components/popover');

    assert.equal(currentURL(), '/components/popover');
  });
});

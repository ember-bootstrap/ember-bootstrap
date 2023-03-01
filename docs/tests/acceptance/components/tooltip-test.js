import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/tooltip', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/tooltip', async function (assert) {
    await visit('/components/tooltip');

    assert.equal(currentURL(), '/components/tooltip');
  });
});

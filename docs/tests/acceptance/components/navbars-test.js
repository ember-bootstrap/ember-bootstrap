import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/navbars', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/navbars', async function (assert) {
    await visit('/components/navbars');

    assert.equal(currentURL(), '/components/navbars');
  });
});

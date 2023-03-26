import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/navs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/navs', async function (assert) {
    await visit('/components/navs');

    assert.equal(currentURL(), '/components/navs');
  });
});

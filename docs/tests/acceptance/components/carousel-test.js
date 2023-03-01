import { module, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/carousel', function (hooks) {
  setupApplicationTest(hooks);

  skip('visiting /components/carousel', async function (assert) {
    await visit('/components/carousel');

    assert.equal(currentURL(), '/components/carousel');
  });
});

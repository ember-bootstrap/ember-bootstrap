import { module, test } from 'qunit';
import { visit, currentURL, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/carousel', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/carousel', async function (assert) {
    // Ember never enters settled state after entering the route due to auto play
    visit('/components/carousel');

    // Wait until Ember rendered the UI and stop playing
    await waitFor('[data-test-option="interval"]');
    await fillIn('[data-test-option="interval"] input', 0);

    assert.equal(currentURL(), '/components/carousel');
  });
});

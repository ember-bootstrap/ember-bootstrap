import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  fillIn,
  find,
  settled,
  waitFor,
  waitUntil,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';

module('Acceptance | components/carousel', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/carousel', async function (assert) {
    // Control the time to speed up test
    const clock = sinon.useFakeTimers({ shouldAdvanceTime: true });

    // Ember never enters settled state after entering the route due to auto play
    visit('/components/carousel');

    // Wait until Ember rendered the UI
    await waitFor('[data-test-option="interval"] input');
    assert.equal(currentURL(), '/components/carousel');
    assert
      .dom('[data-test-example="main"] .carousel-item.active img')
      .hasAttribute('alt', 'First slide', 'shows the first slide');

    const intervalBetweenSlides = find(
      '[data-test-option="interval"] input',
    ).value;

    // Stop carousel from playing to enter settled state
    fillIn('[data-test-option="interval"] input', 0);
    await waitUntil(() => {
      return find('[data-test-option="interval"] input').value === '0';
    });

    // move time forward to have next slide shown immediately
    clock.tick(intervalBetweenSlides * 1000);
    await settled();

    assert
      .dom('[data-test-example="main"] .carousel-item.active img')
      .hasAttribute('alt', 'Second slide', 'shows the second slide');
  });
});

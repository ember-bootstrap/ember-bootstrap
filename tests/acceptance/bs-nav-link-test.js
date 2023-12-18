import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bs-nav-link', function (hooks) {
  setupApplicationTest(hooks);

  test('href exists in anchor inside nav item', async function (assert) {
    await visit('/acceptance/link/1');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[0])
      .hasAttribute('href', '/acceptance/link/1');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[1])
      .hasAttribute('href', '/acceptance/link/2');
    assert
      .dom(this.element.querySelectorAll('.nav li a')[2])
      .hasAttribute('href', '/acceptance/link/1');
  });
});

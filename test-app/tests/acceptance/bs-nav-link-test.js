import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { isFirefox } from '../helpers/user-agent';

module('Acceptance | bs-nav-link', function (hooks) {
  setupApplicationTest(hooks);

  test.if(
    'href exists in anchor inside nav item',
    !isFirefox(),
    async function (assert) {
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
    },
  );
});

import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { closeButtonClass } from '../helpers/bootstrap';
import { isFirefox } from '../helpers/user-agent';

module('Acceptance | bs-modal', function (hooks) {
  setupApplicationTest(hooks);

  // Test for https://github.com/kaliber5/ember-bootstrap/issues/53
  test.if(
    'Closing modal waits for transition to complete',
    !isFirefox(),
    async function (assert) {
      await visit('/acceptance/modal');
      await click('#openModal');
      await click(`.modal .${closeButtonClass()}`);

      assert
        .dom('.modal')
        .doesNotExist(
          'Modal is removed, that means the fade transition has finished.',
        );
    },
  );
});

import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { visibilityClass } from '../helpers/bootstrap';

module('FastBoot | modal', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    let { htmlDocument } = await visit('/fastboot/modal');

    assert.dom('.modal').exists();
    assert.dom('.modal').hasClass(visibilityClass());
    assert.dom('.modal').isVisible();
    assert.dom('.modal-backdrop').hasClass(visibilityClass());
    assert.dom('.modal .modal-header .modal-title').hasText('Simple Modal');
    assert.dom('.modal .modal-body').hasText('Hi there');

    assert.dom('body', htmlDocument).hasClass('modal-open');
  });
});

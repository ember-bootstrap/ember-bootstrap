import { find, findAll } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test, defaultButtonClass } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-modal/footer', function(hooks) {
  setupRenderingTest(hooks);

  test('Footer has close button', async function(assert) {
    await render(hbs`{{bs-modal/footer closeTitle="close"}}`);

    assert.equal(findAll('.modal-footer').length, 1, 'Modal footer exists.');
    assert.equal(findAll('.modal-footer button').length, 1, 'Modal has button.');
    assert.ok(find('.modal-footer button').classList.contains('btn-primary'), 'Button is a primary button.');
    assert.ok(find('.modal-footer button').getAttribute('type'), 'button', 'Submit button is of type submit.');
    assert.equal(find('.modal-footer button').textContent.trim(), 'close', 'Button title is correct.');
  });

  test('Footer can have submit button', async function(assert) {
    await render(hbs`{{bs-modal/footer closeTitle="close" submitTitle="submit"}}`);

    assert.equal(findAll('.modal-footer button').length, 2, 'Modal footer has two button.');
    assert.ok(find('.modal-footer button:first-child').classList.contains(defaultButtonClass()), 'Close button is a default button.');
    assert.ok(find('.modal-footer button:first-child').getAttribute('type'), 'button', 'Submit button is of type submit.');
    assert.equal(find('.modal-footer button:first-child').textContent.trim(), 'close', 'Close button title is correct.');
    assert.ok(find('.modal-footer button:last-child').classList.contains('btn-primary'), 'Submit button is a primary button.');
    assert.ok(find('.modal-footer button:last-child').getAttribute('type'), 'submit', 'Submit button is of type submit.');
    assert.equal(find('.modal-footer button:last-child').textContent.trim(), 'submit', 'Submit button title is correct.');
  });

  test('Footer can have a custom submitButtonType', async function(assert) {
    await render(hbs`{{bs-modal/footer closeTitle="close" submitTitle="submit" submitButtonType="danger"}}`);
    assert.ok(find('.modal-footer button:last-child').classList.contains('btn-danger'), 'Submit button is a danger button.');
  });

  test('Footer can have custom block content', async function(assert) {
    await render(hbs`{{#bs-modal/footer closeTitle="close" submitTitle="submit"}}custom{{/bs-modal/footer}}`);

    assert.equal(findAll('.modal-footer button').length, 0, 'Modal footer has no buttons.');
    assert.equal(find('.modal-footer').textContent.trim(), 'custom', 'Block content is shown.');
  });

  test('submitDisabled disables submit button', async function(assert) {
    this.set('disabled', true);
    await render(hbs`{{bs-modal/footer closeTitle="close" submitTitle="submit" submitDisabled=disabled}}`);

    assert.equal(findAll('.modal-footer button').length, 2, 'Modal footer has two button.');
    assert.notOk(find('.modal-footer button:first-child').disabled, 'Close button is not disabled.');
    assert.ok(find('.modal-footer button:last-child').disabled, 'Submit button is disabled.');

    this.set('disabled', false);

    assert.notOk(find('.modal-footer button:last-child').disabled, 'Submit button is not disabled.');

  });
});

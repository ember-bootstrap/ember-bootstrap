import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-modal/header', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Header has default markup', async function(assert) {
    await render(hbs`{{bs-modal/header title="Header"}}`);

    assert.dom('.modal-header').exists({ count: 1 }, 'Modal header exists.');
    assert.dom('.modal-header button.close').exists({ count: 1 }, 'Modal header has close button.');
    assert.dom('.modal-header .modal-title').exists({ count: 1 }, 'Modal header has title.');
    assert.dom('.modal-header .modal-title').hasText('Header', 'Footer title is correct.');
  });

  test('Header can have custom block content', async function(assert) {
    await render(hbs`{{#bs-modal/header}}<div id="custom">Test</div>{{/bs-modal/header}}`);

    assert.dom('.modal-header div#custom').exists({ count: 1 }, 'Modal header custom block.');
    assert.equal(this.element.querySelector('.modal-header #custom').innerHTML.trim(), 'Test', 'Block content is shown.');
    assert.dom('.modal-header button.close').exists({ count: 1 }, 'Modal header has close button.');

  });

  test('close button can be removed', async function(assert) {
    await render(hbs`{{bs-modal/header title="Header" closeButton=false}}`);

    assert.dom('.modal-header button.close').doesNotExist('Modal header has no close button.');
  });
});

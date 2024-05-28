import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/button', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('dropdown button has correct default markup', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button>Test</dd.button></BsDropdown>`,
    );

    assert.dom('button').exists('dropdown button is a button');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
  });

  test('dropdown button has coorect css type class', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button @type='primary'>Test</dd.button></BsDropdown>`,
    );

    assert
      .dom('button')
      .hasClass('btn-primary', 'dropdown button has primary type');
  });

  test('dropdown button has correct css outline class', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button @outline={{true}}>Test</dd.button></BsDropdown>`,
    );

    assert
      .dom('button')
      .hasClass(
        'btn-outline-secondary',
        'dropdown button has secondary outline type',
      );
  });

  test('dropdown button has correct size', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button @size='lg'>Test</dd.button></BsDropdown>`,
    );

    assert.dom('button').hasClass('btn-lg', 'dropdown button has large size');
  });

  test('dropdown button has correct css active class', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button @active={{true}}>Test</dd.button></BsDropdown>`,
    );

    assert.dom('button').hasClass('active', 'dropdown button is active');
  });
});

import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test, testBS3, testBS4, versionDependent } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-navbar/toggle', function(hooks) {
  setupRenderingTest(hooks);

  testBS3('it renders inline usage', async function(assert) {
    await render(hbs`{{bs-navbar/toggle}}`);

    assert.dom('*').hasText('Toggle navigation');
  });

  testBS4('it renders inline usage', async function(assert) {
    await render(hbs`{{bs-navbar/toggle}}`);

    assert.dom('.navbar-toggler > span').hasClass('navbar-toggler-icon');
  });

  test('it renders block usage', async function(assert) {
    await render(hbs`
      {{#bs-navbar/toggle}}
        template block text
      {{/bs-navbar/toggle}}
    `);

    assert.dom('*').hasText('template block text');
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{bs-navbar/toggle}}`);

    assert.dom('button').exists({ count: 1 }, 'there is exactly one button element');
    assert.dom('button').hasClass(versionDependent('navbar-toggle','navbar-toggler'), 'the toggle has the appropriate toggle class');
    assert.dom('button').hasClass('collapsed', 'the toggle has the collapsed class');
    assert.dom('button').doesNotHaveClass('btn', 'the toggle is a simple button without .btn');
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-navbar/nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{bs-navbar/nav}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#bs-navbar/nav}}
        template block text
      {{/bs-navbar/nav}}
    `);

    assert.dom('*').hasText('template block text');
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`
      {{#bs-navbar/nav}}
        Nav
      {{/bs-navbar/nav}}
    `);

    assert.dom('*').hasText('Nav');
    assert.dom('.navbar-nav').exists({ count: 1 }, 'there is only one element with the navbar-nav class');
    assert.dom('.navbar-nav').hasClass('nav', 'it has the nav class indicating it derives from bs-nav');
  });

  test('it no longer supports the justified option', async function(assert) {
    await render(hbs`{{bs-navbar/nav justified=true}}`);

    assert.dom('.navbar-justified').doesNotExist('the justified class was not applied');
  });
});

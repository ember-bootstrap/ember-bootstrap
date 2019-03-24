import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

module('Integration | Component | bs-nav', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-nav}}
        template block text
      {{/bs-nav}}
    `);

    assert.dom('*').hasText('template block text', 'Shows block content');
    assert.dom('ul').exists({ count: 1 }, 'it is an unordered list');
    assert.dom('ul').hasClass('nav', 'has nav class');
  });

  testBS3('it supports bootstrap options', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{bs-nav justified=true stacked=true type="pills"}}
    `);

    assert.dom('ul').hasClass('nav-pills', 'has pills class');
    assert.dom('ul').hasClass('nav-justified', 'has justified class');
    assert.dom('ul').hasClass('nav-stacked', 'has stacked class');
  });

  testBS4('it supports bootstrap options', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{bs-nav justified=true stacked=true fill=true type="pills"}}
    `);

    assert.dom('ul').hasClass('nav-pills', 'has pills class');
    assert.dom('ul').hasClass('nav-justified', 'has justified class');
    assert.dom('ul').hasClass('nav-fill', 'has fill class');
    assert.dom('ul').hasClass('flex-column', 'has stacked class');
  });

  test('it exposes contextual components', async function(assert) {
    this.owner.lookup('router:main').setupRouter();
    await render(hbs`
      {{#bs-nav as |nav|}}
        {{#nav.item}}
          {{#nav.link-to "application"}}Dummy{{/nav.link-to}}
        {{/nav.item}}
        {{#nav.dropdown as |dd|}}
          {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
          {{#dd.menu as |ddm|}}
            {{#ddm.item}}{{#ddm.link-to "index"}}Home{{/ddm.link-to}}{{/ddm.item}}
          {{/dd.menu}}
        {{/nav.dropdown}}
      {{/bs-nav}}
    `);

    assert.dom('.nav').exists({ count: 1 }, 'it has the nav');
    assert.dom('.nav > li').exists({ count: 2 }, 'it has the nav item');
    assert.dom('.nav > li > a[href="/"]').exists({ count: 1 }, 'it has the nav link');
    assert.dom('.nav > li.dropdown').exists({ count: 1 }, 'it has a dropdown as a nav item');
    assert.deprecations();
  });
});

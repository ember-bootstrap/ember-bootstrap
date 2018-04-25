import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import {
  dropdownVisibilityElementSelector,
  isHidden,
  isVisible,
  openClass,
  test,
  testBS4
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('dropdown container has dropdown class', async function(assert) {
    await render(hbs`{{#bs-dropdown}}Test{{/bs-dropdown}}`);

    assert.dom('.dropdown').exists('has dropdown class');
  });

  test('dropdown container supports dropup style', async function(assert) {
    await render(hbs`{{#bs-dropdown direction="up"}}Test{{/bs-dropdown}}`);

    assert.dom('.dropup').exists('has dropup class');
  });

  testBS4('dropdown container supports dropright style', async function(assert) {
    await render(hbs`{{#bs-dropdown direction="right"}}Test{{/bs-dropdown}}`);

    assert.dom('.dropright').exists('has dropright class');
  });

  testBS4('dropdown container supports dropleft style', async function(assert) {
    await render(hbs`{{#bs-dropdown direction="left"}}Test{{/bs-dropdown}}`);

    assert.dom('.dropleft').exists('has dropleft class');
  });

  test('dropdown container with dropdown button has btn-group class', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );
    assert.dom('.btn-group').exists('has btn-group class');
  });

  test('dropdown container with block dropdown button has dropdown class', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.button block=true}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );
    assert.dom('.dropdown').exists('has dropdown class');
  });

  test('dropdown container with dropdown button supports dropup style', async function(assert) {
    await render(
      hbs`{{#bs-dropdown direction="up" as |dd|}}{{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );
    assert.dom('.btn-group').exists('has btn-group class');
    assert.dom('.dropup').exists('has dropup class');
  });

  test('dropdown-toggle toggles dropdown visibility', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );

    assert.dom(dropdownVisibilityElementSelector()).hasNoClass(openClass(), 'Dropdown is closed');
    await click('a.dropdown-toggle');
    assert.dom(dropdownVisibilityElementSelector()).hasClass(openClass(), 'Dropdown is open');
    await click('a.dropdown-toggle');
    assert.dom(dropdownVisibilityElementSelector()).hasNoClass(openClass(), 'Dropdown is closed');
  });

  test('opened dropdown will close on outside click', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );

    await click('a.dropdown-toggle');
    assert.dom(dropdownVisibilityElementSelector()).hasClass(openClass(), 'Dropdown is open');

    await click('*');
    assert.dom(dropdownVisibilityElementSelector()).hasNoClass(openClass(), 'Dropdown is closed');
  });

  test('clicking dropdown menu will close it', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );
    await click('a.dropdown-toggle');
    assert.dom(dropdownVisibilityElementSelector()).hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom(dropdownVisibilityElementSelector()).hasNoClass(openClass(), 'Dropdown is closed');
  });

  test('dropdown will close on click, when default is prevented, propagation is stopped', async function(assert) {
    assert.expect(3);

    this.set('stopEvent', (event) => {
      event.stopPropagation();
      event.preventDefault();
      assert.ok('stopped event');
    });

    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}<div id="target" onclick={{action stopEvent}} />`
    );

    await click('a.dropdown-toggle');
    assert.dom(`.${openClass()}`).exists('Dropdown is open');

    await click('#target');
    assert.dom(`.${openClass()}`).doesNotExist('Dropdown is closed');
  });

  test('clicking dropdown menu when closeOnMenuClick is false will not close it', async function(assert) {
    await render(
      hbs`{{#bs-dropdown closeOnMenuClick=false as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );
    await click('a.dropdown-toggle');
    assert.dom(dropdownVisibilityElementSelector()).hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom(dropdownVisibilityElementSelector()).hasClass(openClass(), 'Dropdown is open');
  });

  test('child components can access isOpen property', async function(assert) {
    await render(
      hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}<span id="toggleText">{{if dd.isOpen "open" "closed"}}</span>{{/dd.toggle}}{{/bs-dropdown}}`
    );

    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('open', 'Dropdown is open');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
  });

  test('opening dropdown calls onShow action', async function(assert) {
    let action = this.spy();
    this.actions.show = action;
    await render(
      hbs`{{#bs-dropdown onShow=(action "show") as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );

    await click('a.dropdown-toggle');
    assert.ok(action.calledOnce);
  });

  test('closing dropdown calls onHide action', async function(assert) {
    let action = this.spy();
    this.actions.hide = action;
    await render(
      hbs`{{#bs-dropdown onHide=(action "hide") as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`
    );

    await click('a.dropdown-toggle');
    await click('.dropdown-menu a');
    assert.ok(action.calledOnce);
  });

  test('dropdown yields the openDropdown action', async function(assert) {
    let action = this.spy();
    this.actions.show = action;
    await render(
      hbs`{{#bs-dropdown onShow=(action 'show') as |dd|}}
            {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
            {{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}
            <a {{action dd.openDropdown}} class='custom-open'>Custom open link</a>
          {{/bs-dropdown}}`
    );

    await click('a.custom-open');
    assert.ok(action.calledOnce);
  });

  test('dropdown yields the closeDropdown action', async function(assert) {
    let hide = this.spy();
    this.actions.hide = hide;
    await render(
      hbs`{{#bs-dropdown closeOnMenuClick=false onHide=(action 'hide') as |dd|}}
            {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
            {{#dd.menu}}
              <li>
                <a href="#">Something</a>
                <a {{action dd.closeDropdown}} class='custom-close'>Custom close link</a>
              </li>
            {{/dd.menu}}
          {{/bs-dropdown}}`
    );

    await click('a.dropdown-toggle');
    await click('.custom-close');
    assert.ok(hide.calledOnce);
  });

  test('dropdown yields the toggleDropdown action', async function(assert) {
    let show = this.spy();
    let hide = this.spy();
    this.actions.hide = hide;
    this.actions.show = show;
    await render(
      hbs`{{#bs-dropdown onShow=(action 'show') onHide=(action 'hide') as |dd|}}
            {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
            {{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}
            <a {{action dd.toggleDropdown}} class='custom-toggle'>Custom toggle link</a>
          {{/bs-dropdown}}`
    );

    await click('a.custom-toggle');
    assert.ok(show.calledOnce);

    await click('a.custom-toggle');
    assert.ok(hide.calledOnce);
  });

  test('opening dropdown makes the menu visible', async function(assert) {
    await render(hbs`
    {{#bs-dropdown as |dd|}}
      {{#dd.toggle}}Dropdown{{/dd.toggle}}
      {{#dd.menu as |menu|}}
        {{#menu.item}}
          {{menu.link-to "Home" "index"}}
        {{/menu.item}}
      {{/dd.menu}}
    {{/bs-dropdown}}`);

    assert.ok(isHidden(this.element.querySelector('.dropdown-menu')));

    await click('a.dropdown-toggle');
    assert.ok(isVisible(this.element.querySelector('.dropdown-menu a')));
    assert.ok(this.element.querySelector('.dropdown-menu').offsetParent !== null);
  });

  testBS4('dropdown menu can be rendered in a wormhole', async function(assert) {
    await render(
      hbs`
        <div id="ember-bootstrap-wormhole"></div>
        {{#bs-dropdown as |dd|}}
          {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
          {{#dd.menu renderInPlace=false}}<li><a href="#">Something</a></li>{{/dd.menu}}
        {{/bs-dropdown}}`
    );

    assert.dom('#ember-bootstrap-wormhole .dropdown-menu').exists({ count: 1 }, 'Menu is rendered in wormhole');
  });
});

import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

module('Integration | Component | bs-tab', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  function assertActiveTab(assert, tabIndex, active = true) {
    if (this.element.querySelectorAll('ul.nav.nav-tabs li').length > 0) {
      assert.equal(this.element.querySelector(`ul.nav.nav-tabs li:nth-child(${tabIndex + 1})`).classList.contains('active'), active, active ? 'tab is active' : 'tab is inactive');
    }
    assert.equal(this.element.querySelector(`.tab-content .tab-pane:nth-child(${tabIndex + 1})`).classList.contains('active'), active, active ? 'tab pane is active' : 'tab pane is inactive');
  }

  test('it yields expected values', async function(assert) {
    await render(hbs`
      {{#bs-tab fade=false as |tab|}}
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
        <div id="activeId">{{tab.activeId}}</div>
        <div id="switch" {{action tab.select "pane2"}}></div>
      {{/bs-tab}}
    `);

    assert.dom('.tab-pane').exists({ count: 2 }, 'yields tab pane component');

    await click('#switch');

    assertActiveTab.call(this, assert, 0, false);
    assertActiveTab.call(this, assert, 1, true);
    assert.dom('#activeId').hasText('pane2', 'yields activeId');
  });

  test('it yields expected values [customTabs=true]', async function(assert) {
    await render(hbs`
      {{#bs-tab fade=false customTabs=true as |tab|}}
        <div class="tab-content">
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
        <div id="activeId">{{tab.activeId}}</div>
        <div id="switch" {{action tab.select "pane2"}}></div>
        </div>
      {{/bs-tab}}
    `);

    assert.dom('.tab-pane').exists({ count: 2 }, 'yields tab pane component');

    await click('#switch');

    assertActiveTab.call(this, assert, 0, false);
    assertActiveTab.call(this, assert, 1, true);
    assert.dom('#activeId').hasText('pane2', 'yields activeId');
  });

  test('it generates tab navigation', async function(assert) {
    await render(hbs`
      {{#bs-tab as |tab|}}
        {{#tab.pane title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assert.dom('ul.nav.nav-tabs').exists({ count: 1 }, 'has tabs navigation');
    assert.dom('ul.nav.nav-tabs > li').exists({ count: 2 }, 'has tabs navigation items');
    assert.dom('ul.nav.nav-tabs > li:nth-child(1) > a').hasText('Tab 1', 'navigation item shows pane title');
    assert.dom('ul.nav.nav-tabs > li:nth-child(2) > a').hasText('Tab 2', 'navigation item shows pane title');
  });

  test('tab navigation items does not have aria role presentation', async function(assert) {
    // Should not have role="presentation" even so Bootstrap 3 docs have it.
    // This was discussed at https://github.com/kaliber5/ember-bootstrap/pull/782.
    await render(hbs`
      {{#bs-tab as |tab|}}
        {{#tab.pane title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assert.dom('ul.nav.nav-tabs > li').doesNotHaveAttribute('role');
  });

  test('first tab is active by default', async function(assert) {
    await render(hbs`
      {{#bs-tab fade=false as |tab|}}
        {{#tab.pane title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assertActiveTab.call(this, assert, 0, true);
    assertActiveTab.call(this, assert, 1, false);
  });

  test('activeId activates tabs', async function(assert) {
    this.set('paneId', 'pane1');
    await render(hbs`
      {{#bs-tab fade=false activeId=paneId as |tab|}}
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assertActiveTab.call(this, assert, 0, true);
    assertActiveTab.call(this, assert, 1, false);

    this.set('paneId', 'pane2');

    assertActiveTab.call(this, assert, 0, false);
    assertActiveTab.call(this, assert, 1, true);
  });

  test('tab navigation is groupable', async function(assert) {
    await render(hbs`
      {{#bs-tab as |tab|}}
        {{#tab.pane title="Tab 1"}}
            tabcontent 1
        {{/tab.pane}}
        {{#tab.pane title="Tab 2"}}
            tabcontent 2
        {{/tab.pane}}
        {{#tab.pane title="Tab 3" groupTitle="Dropdown"}}
            tabcontent 3
        {{/tab.pane}}
        {{#tab.pane title="Tab 4" groupTitle="Dropdown"}}
            tabcontent 4
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assert.dom('ul.nav.nav-tabs').exists({ count: 1 }, 'has tabs navigation');
    assert.dom('ul.nav.nav-tabs > li').exists({ count: 3 }, 'has tabs navigation items');
    assert.dom('ul.nav.nav-tabs > li:nth-child(1) > a').hasText('Tab 1', 'navigation item shows pane title');
    assert.dom('ul.nav.nav-tabs > li:nth-child(2) > a').hasText('Tab 2', 'navigation item shows pane title');
    assert.dom('ul.nav.nav-tabs > li:nth-child(3)').hasClass('dropdown', 'adds dropdown for grouped items');
    assert.dom('ul.nav.nav-tabs > li:nth-child(3) > a').hasText('Dropdown', 'drop down item shows pane groupTitle');

    await click('ul.nav.nav-tabs > li:nth-child(3) a');
    assert.equal(this.element.querySelector('ul.nav.nav-tabs > li:nth-child(3) .dropdown-menu').children.length, 2, 'puts items with groupTitle under dropdown menu');
    assert.dom('ul.nav.nav-tabs > li:nth-child(3) .dropdown-menu > :nth-child(1)').hasText('Tab 3', 'dropdown menu item shows pane title');
    assert.dom('ul.nav.nav-tabs > li:nth-child(3) .dropdown-menu > :nth-child(2)').hasText('Tab 4', 'dropdown menu item shows pane title');
  });

  test('customTabs disables tab navigation generation', async function(assert) {
    await render(hbs`
      {{#bs-tab customTabs=true as |tab|}}
        {{#tab.pane title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assert.dom('ul.nav.nav-tabs').doesNotExist('has no tabs navigation');
  });

  test('type sets tab navigation type', async function(assert) {
    await render(hbs`
      {{#bs-tab type="pills" as |tab|}}
        {{#tab.pane title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    assert.dom('ul.nav.nav-pills').exists({ count: 1 }, 'has pills navigation');
    assert.dom('ul.nav.nav-pills > li').exists({ count: 2 }, 'has tabs navigation items');
  });

  test('calls onChange when changing active tab', async function(assert) {
    let action = this.spy();
    this.actions.change = action;

    await render(hbs`
      {{#bs-tab fade=false onChange=(action "change") as |tab|}}
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    await click('ul.nav.nav-tabs li:nth-child(2) a');
    assert.ok(action.calledWith('pane2', 'pane1'));

    assertActiveTab.call(this, assert, 0, false);
    assertActiveTab.call(this, assert, 1, true);
  });

  test('when onChange returns false active tab is not changed', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.change = action;

    await render(hbs`
      {{#bs-tab fade=false onChange=(action "change") as |tab|}}
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);

    await click('ul.nav.nav-tabs li:nth-child(2) a');
    assert.ok(action.calledWith('pane2', 'pane1'));

    assertActiveTab.call(this, assert, 0, true);
    assertActiveTab.call(this, assert, 1, false);
  });

  test('changing active tab does not change public activeId property (DDAU)', async function(assert) {
    this.set('paneId', 'pane1');
    await render(hbs`
      {{#bs-tab fade=false activeId=paneId as |tab|}}
        {{#tab.pane elementId="pane1" title="Tab 1"}}
          tabcontent 1
        {{/tab.pane}}
        {{#tab.pane elementId="pane2" title="Tab 2"}}
          tabcontent 2
        {{/tab.pane}}
      {{/bs-tab}}
    `);
    await click('ul.nav.nav-tabs li:nth-child(2) a');
    assert.equal(this.get('paneId'), 'pane1', 'Does not modify public activeId property');
  });
});

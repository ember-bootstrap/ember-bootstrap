import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('bs-tab', 'Integration | Component | bs-tab', {
  integration: true
});

function assertActiveTab(assert, tabIndex, active = true) {
  if (this.$('ul.nav.nav-tabs li').length > 0) {
    assert.equal(this.$(`ul.nav.nav-tabs li:eq(${tabIndex})`).hasClass('active'), active, active ? 'tab is active' : 'tab is inactive');
  }
  assert.equal(this.$(`.tab-content .tab-pane:eq(${tabIndex})`).hasClass('active'), active, active ? 'tab pane is active' : 'tab pane is inactive');
}

test('it yields expected values', function(assert) {
  this.render(hbs`
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

  assert.equal(this.$('.tab-pane').length, 2, 'yields tab pane component');

  this.$('#switch').click();

  assertActiveTab.call(this, assert, 0, false);
  assertActiveTab.call(this, assert, 1, true);
  assert.equal(this.$('#activeId').text().trim(), 'pane2', 'yields activeId');
});

test('it yields expected values [customTabs=true]', function(assert) {
  this.render(hbs`
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

  assert.equal(this.$('.tab-pane').length, 2, 'yields tab pane component');

  this.$('#switch').click();

  assertActiveTab.call(this, assert, 0, false);
  assertActiveTab.call(this, assert, 1, true);
  assert.equal(this.$('#activeId').text().trim(), 'pane2', 'yields activeId');
});

test('it generates tab navigation', function(assert) {
  this.render(hbs`
    {{#bs-tab as |tab|}}
      {{#tab.pane title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-tabs').length, 1, 'has tabs navigation');
  assert.equal(this.$('ul.nav.nav-tabs > li').length, 2, 'has tabs navigation items');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(0) > a').text().trim(), 'Tab 1', 'navigation item shows pane title');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(1) > a').text().trim(), 'Tab 2', 'navigation item shows pane title');
});

test('first tab is active by default', function(assert) {
  this.render(hbs`
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

test('activeId activates tabs', function(assert) {
  this.set('paneId', 'pane1');
  this.render(hbs`
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

test('tab navigation is groupable', function(assert) {
  this.render(hbs`
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

  assert.equal(this.$('ul.nav.nav-tabs').length, 1, 'has tabs navigation');
  assert.equal(this.$('ul.nav.nav-tabs > li').length, 3, 'has tabs navigation items');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(0) > a').text().trim(), 'Tab 1', 'navigation item shows pane title');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(1) > a').text().trim(), 'Tab 2', 'navigation item shows pane title');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(2)').hasClass('dropdown'), true, 'adds dropdown for grouped items');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(2) > a').text().trim(), 'Dropdown', 'drop down item shows pane groupTitle');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(2) > ul.dropdown-menu > li').length, 2, 'puts items with groupTitle under dropdown menu');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(2) > ul.dropdown-menu > li:eq(0) > a').text().trim(), 'Tab 3', 'dropdown menu item shows pane title');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(2) > ul.dropdown-menu > li:eq(1) > a').text().trim(), 'Tab 4', 'dropdown menu item shows pane title');
});

test('customTabs disables tab navigation generation', function(assert) {
  this.render(hbs`
    {{#bs-tab customTabs=true as |tab|}}
      {{#tab.pane title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-tabs').length, 0, 'has no tabs navigation');
});

test('type sets tab navigation type', function(assert) {
  this.render(hbs`
    {{#bs-tab type="pills" as |tab|}}
      {{#tab.pane title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-pills').length, 1, 'has pills navigation');
  assert.equal(this.$('ul.nav.nav-pills > li').length, 2, 'has tabs navigation items');
});

test('calls onChange when changing active tab', function(assert) {
  let action = this.spy();
  this.on('change', action);

  this.render(hbs`
    {{#bs-tab fade=false onChange=(action "change") as |tab|}}
      {{#tab.pane elementId="pane1" title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane elementId="pane2" title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);

  this.$('ul.nav.nav-tabs li:eq(1) a').click();
  assert.ok(action.calledWith('pane2', 'pane1'));

  assertActiveTab.call(this, assert, 0, false);
  assertActiveTab.call(this, assert, 1, true);
});

test('when onChange returns false active tab is not changed', function(assert) {
  let action = this.stub();
  action.returns(false);
  this.on('change', action);

  this.render(hbs`
    {{#bs-tab fade=false onChange=(action "change") as |tab|}}
      {{#tab.pane elementId="pane1" title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane elementId="pane2" title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);

  this.$('ul.nav.nav-tabs li:eq(1) a').click();
  assert.ok(action.calledWith('pane2', 'pane1'));

  assertActiveTab.call(this, assert, 0, true);
  assertActiveTab.call(this, assert, 1, false);
});

test('changing active tab does not change public activeId property (DDAU)', function(assert) {
  this.set('paneId', 'pane1');
  this.render(hbs`
    {{#bs-tab fade=false activeId=paneId as |tab|}}
      {{#tab.pane elementId="pane1" title="Tab 1"}}
        tabcontent 1
      {{/tab.pane}}
      {{#tab.pane elementId="pane2" title="Tab 2"}}
        tabcontent 2
      {{/tab.pane}}
    {{/bs-tab}}
  `);
  this.$('ul.nav.nav-tabs li:eq(1) a').click();
  assert.equal(this.get('paneId'), 'pane1', 'Does not modify public activeId property');
});
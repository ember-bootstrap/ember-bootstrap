import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-tab', 'Integration | Component | bs-tab', {
  integration: true
});

function assertActiveTab(assert, tabIndex, active = true) {
  assert.equal(this.$(`ul.nav.nav-tabs li:eq(${tabIndex})`).hasClass('active'), active, active ? 'tab is active' : 'tab is inactive');
  assert.equal(this.$(`.tab-content .tab-pane:eq(${tabIndex})`).hasClass('active'), active, active ? 'tab pane is active' : 'tab pane is inactive');
}

test('it generates tab navigation', function(assert) {
  this.render(hbs`
    {{#bs-tab}}
      {{#bs-tab-pane title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-tabs').length, 1, 'has tabs navigation');
  assert.equal(this.$('ul.nav.nav-tabs > li').length, 2, 'has tabs navigation items');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(0) > a').text().trim(), 'Tab 1', 'navigation item shows pane title');
  assert.equal(this.$('ul.nav.nav-tabs > li:eq(1) > a').text().trim(), 'Tab 2', 'navigation item shows pane title');
});

test('first tab is active by default', function(assert) {
  this.render(hbs`
    {{#bs-tab}}
      {{#bs-tab-pane title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assertActiveTab(assert, 0, true);
  assertActiveTab(assert, 1, false);
});

test('clicking tab activates it', function(assert) {
  this.render(hbs`
    {{#bs-tab fade=false}}
      {{#bs-tab-pane title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  this.$('ul.nav.nav-tabs li:eq(1) a').click();

  assertActiveTab(assert, 0, false);
  assertActiveTab(assert, 1, true);
});

test('activeId activates tabs', function(assert) {
  this.set('paneId', 'pane1');
  this.render(hbs`
    {{#bs-tab fade=false activeId=paneId}}
      {{#bs-tab-pane elementId="pane1" title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane elementId="pane2" title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assertActiveTab(assert, 0, true);
  assertActiveTab(assert, 1, false);

  this.set('paneId', 'pane2');

  assertActiveTab(assert, 0, false);
  assertActiveTab(assert, 1, true);
});

test('tab navigation is groupable', function(assert) {
  this.render(hbs`
    {{#bs-tab}}
      {{#bs-tab-pane title="Tab 1"}}
          tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
          tabcontent 2
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 3" groupTitle="Dropdown"}}
          tabcontent 3
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 4" groupTitle="Dropdown"}}
          tabcontent 4
      {{/bs-tab-pane}}
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
    {{#bs-tab customTabs=true}}
      {{#bs-tab-pane title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-tabs').length, 0, 'has no tabs navigation');
});

test('type sets tab navigation type', function(assert) {
  this.render(hbs`
    {{#bs-tab type="pills"}}
      {{#bs-tab-pane title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('ul.nav.nav-pills').length, 1, 'has pills navigation');
  assert.equal(this.$('ul.nav.nav-pills > li').length, 2, 'has tabs navigation items');
});

test('calls action after changing active tab', function(assert) {
  assert.expect(3);
  this.on('testAction', (current, previous) => {
    assert.ok(true, 'Action has been called.');
    assert.equal(current, 'pane2');
    assert.equal(previous, 'pane1');
  });

  this.render(hbs`
    {{#bs-tab action=(action "testAction")}}
      {{#bs-tab-pane elementId="pane1" title="Tab 1"}}
        tabcontent 1
      {{/bs-tab-pane}}
      {{#bs-tab-pane elementId="pane2" title="Tab 2"}}
        tabcontent 2
      {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  this.$('ul.nav.nav-tabs li:eq(1) a').click();
});
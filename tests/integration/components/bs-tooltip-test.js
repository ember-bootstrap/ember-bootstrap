import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinonTest from 'dummy/tests/ember-sinon-qunit/test';

moduleForComponent('bs-tooltip', 'Integration | Component | bs tooltip', {
  integration: true
});

test('it shows visible tooltip', function(assert) {
  this.render(hbs`{{bs-tooltip title="Dummy" visible=true}}`);

  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');
  assert.equal(this.$('.tooltip .tooltip-inner').text().trim(), 'Dummy');
});

test('it shows visible tooltip with block content', function(assert) {
  this.render(hbs`{{#bs-tooltip visible=true}}
    BLOCK
    {{/bs-tooltip}}`);

  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');
  assert.equal(this.$('.tooltip .tooltip-inner').text().trim(), 'BLOCK');
});

test('it hides invisible tooltip', function(assert) {
  this.render(hbs`{{bs-tooltip title="Dummy"}}`);

  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it shows and hides immediately when hovering over triggerTarget [fade=false]', function(assert) {
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false}}</div>`);

  this.$('#target').trigger('mouseover');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').trigger('mouseout');
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it shows and hides immediately when clicking on triggerTarget and [fade=false]', function(assert) {
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false triggerEvents="click"}}</div>`);

  this.$('#target').click();
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').click();
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

sinonTest('it calls onShow/onShown actions when showing tooltip [fade=false]', function(assert) {
  let showAction = this.spy();
  this.on('show', showAction);
  let shownAction = this.spy();
  this.on('shown', shownAction);
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onShow=(action "show") onShown=(action "shown")}}</div>`);
  this.$('#target').trigger('mouseover');
  assert.ok(showAction.calledOnce, 'show action was called');
  assert.ok(shownAction.calledOnce, 'show action was called');
});

sinonTest('it aborts showing if onShow action returns false', function(assert) {
  let showAction = this.stub();
  showAction.returns(false);
  this.on('show', showAction);
  let shownAction = this.spy();
  this.on('shown', shownAction);
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onShow=(action "show") onShown=(action "shown")}}</div>`);
  this.$('#target').trigger('mouseover');
  assert.ok(showAction.calledOnce, 'show action was called');
  assert.notOk(shownAction.calledOnce, 'show action was called');
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('Renders in wormhole if renderInPlace is not set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.tooltip').length, 1, 'Tooltip exists.');
  assert.equal(this.$('.tooltip').parent().attr('id'), 'ember-bootstrap-modal-container');
});

test('Renders in place (no wormhole) if renderInPlace is set', function(assert) {
  this.set('show', false);
  this.render(hbs`<div id="ember-bootstrap-modal-container"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false renderInPlace=true}}{{/if}}`);
  this.set('show', true);

  assert.equal(this.$('.tooltip').length, 1, 'Tooltip exists.');
  assert.notEqual(this.$('.tooltip').parent().attr('id'), 'ember-bootstrap-modal-container');
});
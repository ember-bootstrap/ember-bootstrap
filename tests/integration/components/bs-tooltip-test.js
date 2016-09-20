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

test('it shows and hides immediately when clicking on triggerTarget [fade=false]', function(assert) {
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
  assert.ok(showAction.calledOnce, 'show action has been called');
  assert.ok(shownAction.calledOnce, 'show action has been called');
});

sinonTest('it aborts showing if onShow action returns false', function(assert) {
  let showAction = this.stub();
  showAction.returns(false);
  this.on('show', showAction);
  let shownAction = this.spy();
  this.on('shown', shownAction);
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onShow=(action "show") onShown=(action "shown")}}</div>`);
  this.$('#target').trigger('mouseover');
  assert.ok(showAction.calledOnce, 'show action has been called');
  assert.notOk(shownAction.calledOnce, 'show action has not been called');
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

sinonTest('it calls onHide/onHidden actions when hiding tooltip [fade=false]', function(assert) {
  let hideAction = this.spy();
  this.on('hide', hideAction);
  let hiddenAction = this.spy();
  this.on('hidden', hiddenAction);
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onHide=(action "hide") onHidden=(action "hidden")}}</div>`);
  this.$('#target').trigger('mouseover');
  this.$('#target').trigger('mouseout');
  assert.ok(hideAction.calledOnce, 'hide action has been called');
  assert.ok(hiddenAction.calledOnce, 'hidden action was called');
});

sinonTest('it aborts hiding if onHide action returns false', function(assert) {
  let hideAction = this.stub();
  hideAction.returns(false);
  this.on('hide', hideAction);
  let hiddenAction = this.spy();
  this.on('hidden', hiddenAction);
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onHide=(action "hide") onHidden=(action "hidden")}}</div>`);
  this.$('#target').trigger('mouseover');
  this.$('#target').trigger('mouseout');
  assert.ok(hideAction.calledOnce, 'hide action has been called');
  assert.notOk(hiddenAction.calledOnce, 'hidden action has not been called');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');
});

test('it keeps showing when leaving the mouse but is still focused [fade=false]', function(assert) {
  this.render(hbs`<a href="#" id="target">{{bs-tooltip title="Dummy" fade=false}}</a>`);

  this.$('#target').focus();
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').trigger('mouseover');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');
  this.$('#target').trigger('mouseout');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');
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
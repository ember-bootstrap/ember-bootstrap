import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinonTest from 'dummy/tests/ember-sinon-qunit/test';

moduleForComponent('bs-tooltip', 'Integration | Component | bs tooltip', {
  integration: true
});

function setupForPositioning() {
  this.$('#container')
    .css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      textAlign: 'right',
      width: 300,
      height: 300
    });

  this.$('a')
    .css('margin-top', 200);
}

function assertPositioning(assert) {
  assert.equal(this.$('.tooltip').length, 1, 'Tooltip exists.');

  let $tooltip = this.$('.tooltip');
  let $trigger = this.$('#target');
  assert.ok(Math.round($tooltip.offset().top + $tooltip.outerHeight()) <= Math.round($trigger.offset().top));
}

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

test('it shows and hides immediately when hovering [fade=false]', function(assert) {
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false}}</div>`);

  this.$('#target').trigger('mouseover');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').trigger('mouseout');
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it shows and hides immediately when focusing [fade=false]', function(assert) {
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false}}</div>`);

  this.$('#target').focusin();
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').focusout();
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it shows and hides immediately when clicking [fade=false]', function(assert) {
  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false triggerEvents="click"}}</div>`);

  this.$('#target').click();
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').click();
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it allows changing the trigger element to some arbitrary element', function(assert) {
  this.render(hbs`<div id="target"></div><div>{{bs-tooltip title="Dummy" fade=false triggerElement="#target"}}</div>`);

  this.$('#target').trigger('mouseover');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').trigger('mouseout');
  assert.equal(this.$('.tooltip').length, 0, 'tooltip is not visible');
});

test('it allows changing the trigger element to the parent view', function(assert) {
  let dummyComponent = Ember.Component.extend({
    layout: hbs`<div>{{yield}}</div>`
  });
  this.register('component:dum-my', dummyComponent);

  this.render(hbs`{{#dum-my id="target"}}{{bs-tooltip title="Dummy" fade=false triggerElement="parentView"}}{{/dum-my}}`);

  this.$('#target').trigger('mouseover');
  assert.equal(this.$('.tooltip').length, 1, 'tooltip is visible');

  this.$('#target').trigger('mouseout');
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

test('should place tooltip on top of element', function(assert) {
  this.render(hbs`<div id="container"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false}}</a></p></div>`);

  setupForPositioning.call(this);

  this.$('#target').trigger('mouseover');
  assertPositioning.call(this, assert);
});

test('should place tooltip on top of element if already visible', function(assert) {
  assert.expect(2);
  let done = assert.async();
  this.render(hbs`<div id="container"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=true}}</a></p></div>`);

  setupForPositioning.call(this);
  setTimeout(function() {
    assertPositioning.call(this, assert);
    done();
  }, 0);
});

test('should place tooltip on top of element if visible is set to true', function(assert) {
  this.set('visible', false);
  this.render(hbs`<div id="container"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=visible}}</a></p></div>`);

  setupForPositioning.call(this);

  this.set('visible', true);
  assertPositioning.call(this, assert);
});

test('should show tooltip if leave event hasn\'t occurred before delay expires', function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);
  let $trigger = this.$('#target');

  setTimeout(function() {
    assert.notOk(this.$('.tooltip').is('.fade.in'), '100ms: tooltip is not faded in');
  }, 100);

  setTimeout(function() {
    assert.ok(this.$('.tooltip').is('.fade.in'), '200ms: tooltip is faded in');
    done();
  }, 200);

  $trigger.trigger('mouseenter');
});

test('should not show tooltip if leave event occurs before delay expires', function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);
  let $trigger = this.$('#target');

  setTimeout(function() {
    assert.notOk(this.$('.tooltip').is('.fade.in'), '100ms: tooltip not faded in');
    $trigger.trigger('mouseout');
  }, 100);

  setTimeout(function() {
    assert.notOk(this.$('.tooltip').is('.fade.in'), '200ms: tooltip not faded in');
    done();
  }, 200);

  $trigger.trigger('mouseenter');
});

test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', function(assert) {
  assert.expect(3);
  let done = assert.async();

  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" delayShow=0 delayHide=150}}</div>`);
  let $trigger = this.$('#target');

  setTimeout(function() {
    assert.ok(this.$('.tooltip').is('.fade.in'), '1ms: tooltip faded in');
    $trigger.trigger('mouseout');

    setTimeout(function() {
      assert.ok(this.$('.tooltip').is('.fade.in'), '100ms: tooltip still faded in');
      $trigger.trigger('mouseenter');
    }, 100);

    setTimeout(function() {
      assert.ok(this.$('.tooltip').is('.fade.in'), '200ms: tooltip still faded in');
      done();
    }, 200);
  }, 0);

  $trigger.trigger('mouseenter');
});

test('should not show tooltip if leave event occurs before delay expires', function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);
  let $trigger = this.$('#target');

  setTimeout(function() {
    assert.notOk(this.$('.tooltip').is('.fade.in'), '100ms: tooltip not faded in');
    $trigger.trigger('mouseout');
  }, 100);

  setTimeout(function() {
    assert.notOk(this.$('.tooltip').is('.fade.in'), '200ms: tooltip not faded in');
    done();
  }, 200);

  $trigger.trigger('mouseenter');
});

test('show pass along class attribute', function(assert) {
  assert.expect(1);
  let done = assert.async();

  this.render(hbs`<div id="target">{{bs-tooltip title="Dummy" class='wide' delay=150}}</div>`);
  let $trigger = this.$('#target');
  setTimeout(function() {
    assert.equal(this.$('.tooltip.wide').length, 1);
    done();
  }, 200);

  $trigger.trigger('mouseenter');
});
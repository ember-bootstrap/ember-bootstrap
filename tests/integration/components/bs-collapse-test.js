import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';

moduleForComponent('bs-collapse', 'Integration | Component | bs-collapse', {
  integration: true
});

testBS3('collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

});

testBS4('collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('show'), false, 'collapse does not have show class');

});

testBS3('expanded collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse collapsed=false}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');
});

testBS4('expanded collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse collapsed=false}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('show'), true, 'collapse has show class');
});

testBS3('setting collapse to false expands this item', function(assert) {
  let showAction = this.spy();
  let shownAction = this.spy();
  this.on('show', showAction);
  this.on('shown', shownAction);

  this.set('collapsed', true);
  this.render(hbs`{{#bs-collapse collapsed=collapsed onShow=(action "show") onShown=(action "shown")}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', false);

  assert.ok(showAction.calledOnce, 'onShow action has been called');
  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(shownAction.calledOnce, 'onShown action has been called');
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');

    done();
  }, 500);
});

testBS4('setting collapse to false expands this item', function(assert) {
  let showAction = this.spy();
  let shownAction = this.spy();
  this.on('show', showAction);
  this.on('shown', shownAction);

  this.set('collapsed', true);
  this.render(hbs`{{#bs-collapse collapsed=collapsed onShow=(action "show") onShown=(action "shown")}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', false);

  assert.ok(showAction.calledOnce, 'onShow action has been called');
  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(shownAction.calledOnce, 'onShown action has been called');
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('show'), true, 'collapse has show class');

    done();
  }, 500);
});

test('setting collapse to true collapses this item', function(assert) {
  let hideAction = this.spy();
  let hiddenAction = this.spy();
  this.on('hide', hideAction);
  this.on('hidden', hiddenAction);

  this.set('collapsed', false);
  this.render(hbs`{{#bs-collapse collapsed=collapsed onHide=(action "hide") onHidden=(action "hidden")}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', true);

  assert.ok(hideAction.calledOnce, 'onHide action has been called');
  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(hiddenAction.calledOnce, 'onHidden action has been called');
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

    done();
  }, 500);
});

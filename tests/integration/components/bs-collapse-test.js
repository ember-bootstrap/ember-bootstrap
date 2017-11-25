import { find } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { test, visibilityClass } from '../../helpers/bootstrap-test';

module('Integration | Component | bs-collapse', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('collapse has correct default markup', async function(assert) {
    await render(hbs`{{#bs-collapse}}<p>Just some content</p>{{/bs-collapse}}`);
    assert.equal(find(':first-child').classList.contains('collapse'), true, 'collapse has collapse class');
    assert.equal(find(':first-child').classList.contains(visibilityClass()), false, 'collapse does not have visibility class');

  });

  test('expanded collapse has correct default markup', async function(assert) {
    await render(hbs`{{#bs-collapse collapsed=false}}<p>Just some content</p>{{/bs-collapse}}`);
    assert.equal(find(':first-child').classList.contains('collapse'), true, 'collapse has collapse class');
    assert.equal(find(':first-child').classList.contains(visibilityClass()), true, 'collapse has visibility class');
  });

  test('setting collapse to false expands this item', async function(assert) {
    let showAction = this.spy();
    let shownAction = this.spy();
    this.actions.show = showAction;
    this.actions.shown = shownAction;

    this.set('collapsed', true);
    await render(
      hbs`{{#bs-collapse collapsed=collapsed onShow=(action "show") onShown=(action "shown")}}<p>Just some content</p>{{/bs-collapse}}`
    );
    this.set('collapsed', false);

    assert.ok(showAction.calledOnce, 'onShow action has been called');
    assert.equal(find(':first-child').classList.contains('collapsing'), true, 'collapse has collapsing class while transition is running');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(shownAction.calledOnce, 'onShown action has been called');
      assert.equal(find(':first-child').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find(':first-child').classList.contains(visibilityClass()), true, 'collapse has visibility class');

      done();
    }, 500);
  });

  test('setting collapse to true collapses this item', async function(assert) {
    let hideAction = this.spy();
    let hiddenAction = this.spy();
    this.actions.hide = hideAction;
    this.actions.hidden = hiddenAction;

    this.set('collapsed', false);
    await render(
      hbs`{{#bs-collapse collapsed=collapsed onHide=(action "hide") onHidden=(action "hidden")}}<p>Just some content</p>{{/bs-collapse}}`
    );
    this.set('collapsed', true);

    assert.ok(hideAction.calledOnce, 'onHide action has been called');
    assert.equal(find(':first-child').classList.contains('collapsing'), true, 'collapse has collapsing class while transition is running');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(hiddenAction.calledOnce, 'onHidden action has been called');
      assert.equal(find(':first-child').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find(':first-child').classList.contains('in'), false, 'collapse does not have in class');

      done();
    }, 500);
  });
});

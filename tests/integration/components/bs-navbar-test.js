import { find, findAll, click } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  positionClassFor,
  positionStickyClass,
  visibilityClass,
  test,
  testBS3,
  testBS4
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-navbar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('it has correct default markup', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.equal(findAll('nav').length, 1, 'there is only one nav element');
    assert.ok(find('nav').classList.contains('navbar'), 'the navbar has the navbar class');
    assert.ok(find('nav').classList.contains('navbar-default'), 'the navbar has the navbar-default class');
    assert.equal(findAll('nav > div').length, 1, 'there is a div right under the nav element');
    assert.ok(find('nav > div').classList.contains('container-fluid'), 'the div is a fluid container');
  });

  testBS4('it has correct default markup', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.equal(findAll('nav').length, 1, 'there is only one nav element');
    assert.ok(find('nav').classList.contains('navbar'), 'the navbar has the navbar class');
    assert.ok(find('nav').classList.contains('navbar-light'), 'the navbar has the navbar-default class');
    // No container by default because fluid is automatic
  });

  test('it handles inverse navbars properly', async function(assert) {
    await render(hbs`{{bs-navbar type="inverse"}}`);

    assert.ok(find('nav').classList.contains('navbar-inverse'), 'the navbar has the navbar-inverse class');
    assert.notOk(find('nav').classList.contains('navbar-default'), 'the navbar does not have the navbar-default class');
  });

  test('it handles fluid containers properly', async function(assert) {
    await render(hbs`{{bs-navbar fluid=false}}`);

    assert.ok(find('nav > div').classList.contains('container'), 'the wrapping div has the container class');
    assert.notOk(find('nav > div').classList.contains('container-fluid'), 'the wrapping div does not have the container-fluid class');
  });

  testBS3('it handles the toggling action properly', async function(assert) {
    await render(hbs`
      {{#bs-navbar as |navbar|}}
        {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
      {{/bs-navbar}}
    `);

    assert.ok(find('button.navbar-toggle').classList.contains('collapsed'), 'ensure the default state of the button through the active class');

    let done = assert.async();

    await click('button');
    setTimeout(() => {
      assert.notOk(find('button.navbar-toggle').classList.contains('collapsed'), 'ensure the toggled state of the button through the active class');

      done();
    }, 500);
  });

  testBS4('it handles the toggling action properly', async function(assert) {
    await render(hbs`
      {{#bs-navbar as |navbar|}}
        {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
      {{/bs-navbar}}
    `);

    assert.ok(find('button.navbar-toggler').classList.contains('collapsed'), 'ensure the default state of the button through the active class');

    let done = assert.async();

    await click('button');
    setTimeout(() => {
      assert.notOk(find('button.navbar-toggler').classList.contains('collapsed'), 'ensure the toggled state of the button through the active class');

      done();
    }, 500);
  });

  testBS3('it exposes all the requisite contextual components', async function(assert) {
    await render(hbs`
      {{#bs-navbar as | navbar | }}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);

    assert.equal(findAll('nav.navbar-default').length, 1, 'it has the navbar');
    assert.equal(findAll('nav.navbar-default .navbar-header > button.navbar-toggle').length, 1, 'it has the navbar toggle');
    assert.equal(findAll('nav.navbar-default .navbar-collapse').length, 1, 'it has the navbar content');
    assert.equal(findAll('nav.navbar-default .navbar-collapse > .navbar-nav').length, 1, 'it has the navbar nav');
  });

  testBS4('it exposes all the requisite contextual components', async function(assert) {
    await render(hbs`
      {{#bs-navbar as | navbar | }}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);

    assert.equal(findAll('nav.navbar-light').length, 1, 'it has the navbar');
    assert.equal(findAll('nav.navbar-light .navbar-header > button.navbar-toggler').length, 1, 'it has the navbar toggle');
    assert.equal(findAll('nav.navbar-light .navbar-collapse').length, 1, 'it has the navbar content');
    assert.equal(findAll('nav.navbar-light .navbar-collapse > .navbar-nav').length, 1, 'it has the navbar nav');
  });

  test('it nas no positional classes when position is not specified', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-top')), 'it does not have position fixed-top');
    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-bottom')), 'it does not have position fixed-bottom');
    assert.notOk(find('nav').classList.contains(positionStickyClass()), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="fixed-top"}}`);

    assert.ok(find('nav').classList.contains(positionClassFor('fixed-top')), 'it has position fixed-top');
    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-bottom')), 'it does not have position fixed-bottom');
    assert.notOk(find('nav').classList.contains(positionStickyClass()), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-bottom properly', async function(assert) {
    await render(hbs`{{bs-navbar position="fixed-bottom"}}`);

    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-top')), 'it does not have position fixed-top');
    assert.ok(find('nav').classList.contains(positionClassFor('fixed-bottom')), 'it has position fixed-bottom');
    assert.notOk(find('nav').classList.contains(positionStickyClass()), `it does not have ${positionStickyClass()}`);
  });

  testBS4('it handles navbar-expand[-*] properly', async function(assert) {
    await render(hbs`{{bs-navbar toggleBreakpoint="sm"}}`);
    assert.notOk(find('nav').classList.contains('navbar-expand-lg'), 'it does not have default navbar-expand-lg');
    assert.ok(find('nav').classList.contains('navbar-expand-sm'), 'it has navbar-expand-sm');
  });

  testBS4('it handles navbar-expand properly', async function(assert) {
    await render(hbs`{{bs-navbar toggleBreakpoint=null}}`);
    assert.ok(find('nav').classList.contains('navbar-expand'), 'it has navbar-expand');
  });

  testBS3('it handles static-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="static-top"}}`);

    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-top')), 'it does not have position fixed-top');
    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-bottom')), 'it does not have position fixed-bottom');
    assert.ok(find('nav').classList.contains(positionStickyClass()), `it has ${positionStickyClass()}`);
  });

  testBS4('it handles sticky-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="sticky-top"}}`);

    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-top')), 'it does not have position fixed-top');
    assert.notOk(find('nav').classList.contains(positionClassFor('fixed-bottom')), 'it does not have position fixed-bottom');
    assert.ok(find('nav').classList.contains(positionStickyClass()), `it has ${positionStickyClass()}`);
  });

  test('setting collapse to false expands the navbar', async function(assert) {
    let expandedAction = this.spy();
    this.actions.expandedAction = expandedAction;

    this.set('collapsed', true);
    await render(hbs`
      {{#bs-navbar as collapsed=collapsed onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    this.set('collapsed', false);

    assert.equal(find('.navbar-collapse').classList.contains('collapsing'), true, 'collapse has collapsing class while transition is running');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
      assert.equal(find('.navbar-collapse').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find('.navbar-collapse').classList.contains(visibilityClass()), true, 'collapse has visibility class');

      done();
    }, 500);
  });

  test('setting collapse to true collapses the navbar', async function(assert) {
    let collapsedAction = this.spy();
    this.actions.collapsedAction = collapsedAction;

    this.set('collapsed', false);
    await render(hbs`
      {{#bs-navbar as collapsed=collapsed onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    this.set('collapsed', true);

    assert.equal(find('.navbar-collapse').classList.contains('collapsing'), true, 'collapse has collapsing class while transition is running');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
      assert.equal(find('.navbar-collapse').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find('.navbar-collapse').classList.contains('in'), false, 'collapse does not have in class');

      done();
    }, 500);
  });

  test('Expanding the navbar calls onExpand/onExpanded actions', async function(assert) {
    let expandAction = this.spy();
    let expandedAction = this.spy();
    this.actions.expandAction = expandAction;
    this.actions.expandedAction = expandedAction;

    await render(hbs`
      {{#bs-navbar as collapsed=true onExpand=(action "expandAction") onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');

    assert.ok(expandAction.calledOnce, 'onExpand action has been called');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
      assert.equal(find('.navbar-collapse').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find('.navbar-collapse').classList.contains(visibilityClass()), true, 'collapse has visibility class');

      done();
    }, 500);
  });

  test('Collapsing the navbar calls onCollapse/onCollapsed actions', async function(assert) {
    let collapseAction = this.spy();
    let collapsedAction = this.spy();
    this.actions.collapseAction = collapseAction;
    this.actions.collapsedAction = collapsedAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
      assert.equal(find('.navbar-collapse').classList.contains('collapse'), true, 'collapse has collapse class');
      assert.equal(find('.navbar-collapse').classList.contains('in'), false, 'collapse does not have in class');

      done();
    }, 500);
  });

  test('navbar is not expanded when onExpand action returns false', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.expandAction = action;

    await render(hbs`
      {{#bs-navbar collapsed=true onExpand=(action "expandAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onExpand has been called.');

    assert.equal(find(':first-child').classList.contains('collapsing'), false, 'no transition');
  });

  test('navbar is not collapsed when onCollapse action returns false', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.collapseAction = action;

    await render(hbs`
      {{#bs-navbar collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onCollapse has been called.');

    assert.equal(find(':first-child').classList.contains('collapsing'), false, 'no transition');
  });

  test('clicking the toggle does not modify the public collapsed property', async function(assert) {
    this.set('collapsed', true);
    await render(hbs`
      {{#bs-navbar collapsed=collapsed as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
      {{/bs-navbar}}
    `);

    await click('button');

    let done = assert.async();

    // wait for transitions to complete
    setTimeout(() => {
      assert.equal(this.get('collapsed'), true, 'collapse property did not change');

      done();
    }, 500);
  });

  test('Navbar yields collapse action', async function(assert) {
    let action = this.spy();
    this.actions.action = action;

    await render(hbs`{{#bs-navbar collapsed=false onCollapse=(action "action") as |navbar|}}
        <button {{action navbar.collapse}}>Collapse</button>
    {{/bs-navbar}}`);

    await click('button');
    assert.ok(action.calledOnce, 'onCollapse action has been called.');
  });

  test('Navbar yields expand action', async function(assert) {
    let action = this.spy();
    this.actions.action = action;

    await render(hbs`{{#bs-navbar collapsed=true onExpand=(action "action") as |navbar|}}
        <button {{action navbar.expand}}>Expand</button>
    {{/bs-navbar}}`);

    await click('button');
    assert.ok(action.calledOnce, 'onExpand action has been called.');
  });

  test('Clicking expanded navbar link collapses navbar', async function(assert) {
    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item}}{{#nav.link-to "index" id="link" disabled=true}}Home{{/nav.link-to}}{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');
  });

  test('Clicking expanded navbar link does not collapse navbar when collapseNavbar is false', async function(assert) {
    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item}}{{#nav.link-to "index" id="link" disabled=true collapseNavbar=false}}Home{{/nav.link-to}}{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.notOk(collapseAction.called, 'onCollapse action has not been called');
  });
});

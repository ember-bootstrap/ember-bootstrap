import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import {
  test,
  testRequiringTransitions,
  visibilityClass
} from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-tab/pane', 'Integration | Component | bs-tab/pane', {
  integration: true
});

const transitionTimeout = 250;

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-tab/pane fade=true activeId="pane1" elementId="pane1"}}
      template block text
    {{/bs-tab/pane}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text', 'Shows block content');
  assert.equal(findAll('div.tab-pane').length, 1, 'has tab-pane class');
  assert.equal(find('div.tab-pane').classList.contains('active'), true, 'tab-pane has active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), true, 'tab-pane has visibility class');
});

test('it has correct markup when switching active pane and fade=false', function(assert) {
  this.set('activeId', null);
  this.render(hbs`
    {{#bs-tab/pane fade=false activeId=activeId elementId="pane1"}}
      template block text
    {{/bs-tab/pane}}
  `);

  assert.equal(find('div.tab-pane').classList.contains('fade'), false, 'tab-pane does not have fade class');

  assert.equal(find('div.tab-pane').classList.contains('active'), false, 'tab-pane does not have active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

  this.set('activeId', 'pane1');
  assert.equal(find('div.tab-pane').classList.contains('active'), true, 'tab-pane has active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

  this.set('activeId', null);
  assert.equal(find('div.tab-pane').classList.contains('active'), false, 'tab-pane does not have active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');
});

testRequiringTransitions('it has correct markup when switching active pane and fade=true', function(assert) {
  this.set('activeId', null);
  this.render(hbs`
    {{#bs-tab/pane fade=true activeId=activeId elementId="pane1"}}
      template block text
    {{/bs-tab/pane}}
  `);

  assert.equal(find('div.tab-pane').classList.contains('fade'), true, 'tab-pane has fade class');
  assert.equal(find('div.tab-pane').classList.contains('active'), false, 'tab-pane does not have active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

  this.set('activeId', 'pane1');
  assert.equal(find('div.tab-pane').classList.contains('active'), false, 'tab-pane does not have active class');
  assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(find('div.tab-pane').classList.contains('active'), true, 'tab-pane has active class');
    assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), true, 'tab-pane has visibility class');

    this.set('activeId', null);
    assert.equal(find('div.tab-pane').classList.contains('active'), true, 'tab-pane has active class');
    assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(find('div.tab-pane').classList.contains('active'), false, 'tab-pane does not have active class');
      assert.equal(find('div.tab-pane').classList.contains(visibilityClass()), false, 'tab-pane does not have visibility class');

      done();
    }, transitionTimeout);

  }, transitionTimeout);
});

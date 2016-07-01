import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-tab-pane', 'Integration | Component | bs-tab-pane', {
  integration: true
});

const transitionTimeout = 150;

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-tab activeId="pane1"}}
    {{#bs-tab-pane elementId="pane1"}}
      template block text
    {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');
  assert.equal(this.$('div.tab-pane').length, 1, 'has tab-pane class');
  assert.equal(this.$('div.tab-pane').hasClass('active'), true, 'tab-pane has active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), true, 'tab-pane has in class');
});

test('it has correct markup when switching active pane and fade=false', function(assert) {
  this.set('activeId', null);
  this.render(hbs`
    {{#bs-tab fade=false activeId=activeId}}
    {{#bs-tab-pane elementId="pane1"}}
      template block text
    {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('div.tab-pane').hasClass('fade'), false, 'tab-pane does not have fade class');

  assert.equal(this.$('div.tab-pane').hasClass('active'), false, 'tab-pane does not have active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

  this.set('activeId', 'pane1');
  assert.equal(this.$('div.tab-pane').hasClass('active'), true, 'tab-pane has active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

  this.set('activeId', null);
  assert.equal(this.$('div.tab-pane').hasClass('active'), false, 'tab-pane does not have active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');
});

test('it has correct markup when switching active pane and fade=true', function(assert) {
  this.set('activeId', null);
  this.render(hbs`
    {{#bs-tab fade=true activeId=activeId}}
    {{#bs-tab-pane elementId="pane1"}}
      template block text
    {{/bs-tab-pane}}
    {{/bs-tab}}
  `);

  assert.equal(this.$('div.tab-pane').hasClass('fade'), true, 'tab-pane has fade class');
  assert.equal(this.$('div.tab-pane').hasClass('active'), false, 'tab-pane does not have active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

  this.set('activeId', 'pane1');
  assert.equal(this.$('div.tab-pane').hasClass('active'), false, 'tab-pane does not have active class');
  assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

  let done = assert.async();
  // wait for fade animation
  setTimeout(() => {
    assert.equal(this.$('div.tab-pane').hasClass('active'), true, 'tab-pane has active class');
    assert.equal(this.$('div.tab-pane').hasClass('in'), true, 'tab-pane has in class');

    this.set('activeId', null);
    assert.equal(this.$('div.tab-pane').hasClass('active'), true, 'tab-pane has active class');
    assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

    // wait for fade animation
    setTimeout(() => {
      assert.equal(this.$('div.tab-pane').hasClass('active'), false, 'tab-pane does not have active class');
      assert.equal(this.$('div.tab-pane').hasClass('in'), false, 'tab-pane does not have in class');

      done();
    }, transitionTimeout);

  }, transitionTimeout);
});
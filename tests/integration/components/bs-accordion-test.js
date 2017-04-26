import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  accordionClassFor,
  accordionItemHeadClass,
  test,
  testBS3,
  visibilityClass } from '../../helpers/bootstrap-test';

moduleForComponent('bs-accordion', 'Integration | Component | bs-accordion', {
  integration: true
});

testBS3('accordion has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  assert.ok(this.$(':first-child').hasClass('panel-group'), 'accordion has panel-group class');
});

test('accordion has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  assert.equal(this.$(`.${accordionClassFor()}`).length, 2, 'accordion yields item');
});

test('accordion with preselected item has this item expanded', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$(`.${accordionClassFor()}:eq(0)`);

  assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} has ${visibilityClass()} class`);
});

test('changing selected item expands this item', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  this.set('selected', 2);

  let item = this.$(`.${accordionClassFor()}:eq(1)`);
  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

    done();
  }, 500);
});

test('clicking collapsed item expands it', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  item.find(`.${accordionItemHeadClass()}`).click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

    done();
  }, 500);
});

test('clicking expanded item collapses it', function(assert) {
  this.render(hbs`{{#bs-accordion selected=1 as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

  item.find(`.${accordionItemHeadClass()}`).click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.notOk(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is hidden`);

    done();
  }, 500);
});

test('calls onChange action when changing selection', function(assert) {
  let action = this.spy();
  this.on('change', action);
  this.render(hbs`{{#bs-accordion onChange=(action "change") as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);

  this.$(`.${accordionClassFor()}:eq(0) .${accordionItemHeadClass()}`).click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});

test('prevents changing selection when onChange returns false', function(assert) {
  let action = this.stub();
  action.returns(false);
  this.on('change', action);
  this.render(hbs`{{#bs-accordion onChange=(action "change") as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);

  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  item.find(`.${accordionItemHeadClass()}`).click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.notOk(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is hidden`);

    done();
  }, 500);
});

test('changing selection does not leak to public selected property (DDAU)', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);

  let item = this.$(`.${accordionClassFor()}:eq(1)`);

  item.find(`.${accordionItemHeadClass()}`).click();
  assert.equal(this.get('selected'), 1, 'Does not modify public selected property');
});

test('yields change action to add custom behaviour', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=1 as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1 <button {{action acc.change 2}}>Next</button>{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);

  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  item.find('button').click();

  let newItem = this.$(`.${accordionClassFor()}:eq(1)`);

  // wait for transitions to complete
  setTimeout(() => {
    assert.notOk(newItem.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
    assert.ok(newItem.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.ok(newItem.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

    done();
  }, 500);
});

test('clicking collapsed item with contextual title expands it', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 as |aitem|}}
      {{#aitem.title}}TITLE1{{/aitem.title}}
      {{#aitem.body}}CONTENT1{{/aitem.body}}
    {{/acc.item}}
    {{#acc.item value=2}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  item.find(`.${accordionItemHeadClass()}`).click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

    done();
  }, 500);
});

test('clicking expanded item with contextual title collapses it', function(assert) {
  this.render(hbs`{{#bs-accordion selected=1 as |acc|}}
    {{#acc.item value=1 as |aitem|}}
      {{#aitem.title}}TITLE1{{/aitem.title}}
      {{#aitem.body}}CONTENT1{{/aitem.body}}
    {{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$(`.${accordionClassFor()}:eq(0)`);
  let done = assert.async();

  assert.notOk(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has not collapsed class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
  assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is visible`);

  item.find(`.${accordionItemHeadClass()}`).click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.ok(item.find(`.${accordionItemHeadClass()}`).hasClass('collapsed'), `${accordionItemHeadClass()} has collapsed class`);
    assert.ok(item.find(`.${accordionClassFor('collapse')}`).hasClass('collapse'), `${accordionClassFor('collapse')} has collapse class`);
    assert.notOk(item.find(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), `${accordionClassFor('collapse')} is hidden`);

    done();
  }, 500);
});

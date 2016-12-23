import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('bs-accordion', 'Integration | Component | bs-accordion', {
  integration: true
});

test('accordion has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  assert.equal(this.$(':first-child').hasClass('panel-group'), true, 'accordion has panel-group class');
  assert.equal(this.$('.panel').length, 2, 'accordion yields item');
});

test('accordion with preselected item has this item expanded', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$('.panel:eq(0)');

  assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
  assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
  assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');
});

test('changing selected item expands this item', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  this.set('selected', 2);

  let item = this.$('.panel:eq(1)');
  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
    assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');

    done();
  }, 500);
});

test('clicking collapsed item expands it', function(assert) {
  this.render(hbs`{{#bs-accordion as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$('.panel:eq(0)');
  let done = assert.async();

  item.find('.panel-heading').click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
    assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');

    done();
  }, 500);
});

test('clicking expanded item collapses it', function(assert) {
  this.render(hbs`{{#bs-accordion selected=1 as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);
  let item = this.$('.panel:eq(0)');
  let done = assert.async();

  assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
  assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
  assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');

  item.find('.panel-heading').click();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(item.find('.panel-heading').hasClass('collapsed'), true, 'panel-heading has collapsed class');
    assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(item.find('.panel-collapse').hasClass('in'), false, 'panel-collapse has not in class');

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

  this.$('.panel:eq(0) .panel-heading').click();
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

  let item = this.$('.panel:eq(0)');
  let done = assert.async();

  item.find('.panel-heading').click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(item.find('.panel-heading').hasClass('collapsed'), true, 'panel-heading has collapsed class');
    assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(item.find('.panel-collapse').hasClass('in'), false, 'panel-collapse has not in class');

    done();
  }, 500);
});

test('yields change action to add custom behaviour', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=1 as |acc|}}
    {{#acc.item value=1 title="TITLE1"}}CONTENT1 <button {{action acc.change 2}}>Next</button>{{/acc.item}}
    {{#acc.item value=2 title="TITLE2"}}CONTENT2{{/acc.item}}
  {{/bs-accordion}}`);

  let item = this.$('.panel:eq(0)');
  let done = assert.async();

  item.find('button').click();

  let newItem = this.$('.panel:eq(1)');

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(newItem.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
    assert.equal(newItem.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(newItem.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');

    done();
  }, 500);
});

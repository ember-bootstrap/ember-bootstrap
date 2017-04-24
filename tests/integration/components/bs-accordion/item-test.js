import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { testBS3, testBS4, visibilityClass } from '../../../helpers/bootstrap-test';

moduleForComponent('bs-accordion-item', 'Integration | Component | bs-accordion-item', {
  integration: true
});

testBS3('accordion item has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion/item title="TITLE"}}CONTENT{{/bs-accordion/item}}`);
  assert.equal(this.$(':first-child').hasClass('panel'), true, 'has panel class');
  assert.equal(this.$(':first-child').hasClass('panel-default'), true, 'has panel-default class');
  assert.equal(this.$('.panel-heading').hasClass('collapsed'), true, 'panel-heading has collapsed class');
  assert.equal(this.$('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
  assert.equal(this.$('.panel-collapse').hasClass(visibilityClass()), false, 'panel-collapse is hidden');
  assert.equal(this.$('.panel-title').text().trim(), 'TITLE', 'panel-title has correct title');
  assert.equal(this.$('.panel-body').text().trim(), 'CONTENT', 'panel-body has correct content');
});

testBS4('accordion item has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion/item title="TITLE"}}CONTENT{{/bs-accordion/item}}`);
  assert.equal(this.$(':first-child').hasClass('card'), true, 'has card class');
  assert.equal(this.$(':first-child').hasClass('card-default'), true, 'has card-default class');
  assert.equal(this.$('.card-header').hasClass('collapsed'), true, 'card-header has collapsed class');
  assert.equal(this.$('.card-collapse').hasClass('collapse'), true, 'card-collapse has collapse class');
  assert.equal(this.$('.card-collapse').hasClass(visibilityClass()), false, 'card-collapse is hidden');
  assert.equal(this.$('.card-title').text().trim(), 'TITLE', 'card-title has correct title');
  assert.equal(this.$('.card-block').text().trim(), 'CONTENT', 'card-block has correct content');
});

testBS3('calls onClick action when clicking heading', function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-accordion/item value=1 onClick=(action "click") title="TITLE"}}CONTENT{{/bs-accordion/item}}`);

  this.$('.panel-heading').click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});

testBS4('calls onClick action when clicking heading', function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-accordion/item value=1 onClick=(action "click") title="TITLE"}}CONTENT{{/bs-accordion/item}}`);

  this.$('.card-header').click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});

testBS3('renders a contextual title block', function(assert) {
  this.render(hbs`{{#bs-accordion/item as |aitem|}}
    {{#aitem.title}}TITLE{{/aitem.title}}
    {{#aitem.body}}CONTENT{{/aitem.body}}
  {{/bs-accordion/item}}`);

  assert.equal(this.$('.panel-title').text().trim(), 'TITLE', 'panel-title has correct title');
  assert.equal(this.$('.panel-body').text().trim(), 'CONTENT', 'panel-body has correct content');
});

testBS4('renders a contextual title block', function(assert) {
  this.render(hbs`{{#bs-accordion/item as |aitem|}}
    {{#aitem.title}}TITLE{{/aitem.title}}
    {{#aitem.body}}CONTENT{{/aitem.body}}
  {{/bs-accordion/item}}`);

  assert.equal(this.$('.card-title').text().trim(), 'TITLE', 'card-title has correct title');
  assert.equal(this.$('.card-block').text().trim(), 'CONTENT', 'card-block has correct content');
});

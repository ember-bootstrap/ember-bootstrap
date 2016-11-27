import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-popover-element', 'Integration | Component | bs popover element', {
  integration: true
});

test('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-popover-element fade=true in=true title="dummy title"}}
      template block text
    {{/bs-popover-element}}
  `);

  assert.ok(this.$(':first-child').hasClass('popover'), 'has popover class');
  assert.ok(this.$(':first-child').hasClass('top'), 'has top class');
  assert.ok(this.$(':first-child').hasClass('fade'), 'has fade class');
  assert.ok(this.$(':first-child').hasClass('in'), 'has in class');
  assert.equal(this.$('.arrow').length, 1, 'has arrow');
  assert.equal(this.$('.popover-title').text().trim(), 'dummy title', 'shows title');
  assert.equal(this.$('.popover-content').text().trim(), 'template block text', 'shows content');
});

test('it supports different placements', function(assert) {
  let placements = ['top', 'left', 'bottom', 'right'];
  this.render(hbs`
    {{#bs-popover-element placement=placement title="dummy title"}}
      template block text
    {{/bs-popover-element}}
  `);
  placements.forEach((placement) => {
    this.set('placement', placement);
    assert.ok(this.$(':first-child').hasClass(placement), `has ${placement} class`);
  });
});

test('it passes along class attribute', function(assert) {
  this.render(hbs`
    {{#bs-popover-element placement=placement title="dummy title" class="wide"}}
      template block text
    {{/bs-popover-element}}
  `);

  assert.equal(this.$('.popover.wide').length, 1);
});
import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-popover/element', 'Integration | Component | bs-popover/element', {
  integration: true
});

testBS3('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-popover/element fade=true in=true title="dummy title"}}
      template block text
    {{/bs-popover/element}}
  `);

  assert.ok(this.$(':first-child').hasClass('popover'), 'has popover class');
  assert.ok(this.$(':first-child').hasClass('top'), 'has top class');
  assert.ok(this.$(':first-child').hasClass('fade'), 'has fade class');
  assert.ok(this.$(':first-child').hasClass('in'), 'has in class');
  assert.equal(this.$('.arrow').length, 1, 'has arrow');
  assert.equal(this.$('.popover-title').text().trim(), 'dummy title', 'shows title');
  assert.equal(this.$('.popover-content').text().trim(), 'template block text', 'shows content');
});

testBS4('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-popover/element fade=true in=true title="dummy title"}}
      template block text
    {{/bs-popover/element}}
  `);

  assert.ok(this.$(':first-child').hasClass('popover'), 'has popover class');
  assert.ok(this.$(':first-child').hasClass('popover-top'), 'has popover-top class');
  assert.ok(this.$(':first-child').hasClass('fade'), 'has fade class');
  assert.ok(this.$(':first-child').hasClass('show'), 'has show class');
  assert.equal(this.$('.arrow').length, 1, 'has arrow');
  assert.equal(this.$('.popover-title').text().trim(), 'dummy title', 'shows title');
  assert.equal(this.$('.popover-content').text().trim(), 'template block text', 'shows content');
});

testBS3('it supports different placements', function(assert) {
  let placements = ['top', 'left', 'bottom', 'right'];
  this.render(hbs`
    {{#bs-popover/element placement=placement title="dummy title"}}
      template block text
    {{/bs-popover/element}}
  `);
  placements.forEach((placement) => {
    this.set('placement', placement);
    assert.ok(this.$(':first-child').hasClass(placement), `has ${placement} class`);
  });
});

testBS4('it supports different placements', function(assert) {
  let placements = ['top', 'left', 'bottom', 'right'];
  this.render(hbs`
    {{#bs-popover/element placement=placement title="dummy title"}}
      template block text
    {{/bs-popover/element}}
  `);
  placements.forEach((placement) => {
    this.set('placement', placement);
    let expectedClass = `popover-${placement}`;
    assert.ok(this.$(':first-child').hasClass(expectedClass), `has ${expectedClass} class`);
  });
});

test('it passes along class attribute', function(assert) {
  this.render(hbs`
    {{#bs-popover/element placement=placement title="dummy title" class="wide"}}
      template block text
    {{/bs-popover/element}}
  `);

  assert.equal(this.$('.popover.wide').length, 1);
});

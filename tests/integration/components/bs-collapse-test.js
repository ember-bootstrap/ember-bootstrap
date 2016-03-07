import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-collapse', 'Integration | Component | bs-collapse', {
  integration: true
});

test('collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

});

test('expanded collapse has correct default markup', function(assert) {
  this.render(hbs`{{#bs-collapse collapsed=false}}<p>Just some content</p>{{/bs-collapse}}`);
  assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
  assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');
});

test('setting collapse to false expands this item', function(assert) {
  this.set('collapsed', true);
  this.render(hbs`{{#bs-collapse collapsed=collapsed}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', false);

  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), true, 'collapse has in class');

    done();
  }, 500);
});

test('setting collapse to true collapses this item', function(assert) {
  this.set('collapsed', false);
  this.render(hbs`{{#bs-collapse collapsed=collapsed}}<p>Just some content</p>{{/bs-collapse}}`);
  this.set('collapsed', true);

  assert.equal(this.$(':first-child').hasClass('collapsing'), true, 'collapse has collapsing class while transition is running');

  let done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('collapse'), true, 'collapse has collapse class');
    assert.equal(this.$(':first-child').hasClass('in'), false, 'collapse does not have in class');

    done();
  }, 500);
});

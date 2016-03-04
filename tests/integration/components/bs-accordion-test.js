import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('bs-accordion', 'Integration | Component | bs-accordion', {
  integration: true
});


test('accordion has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion}}{{#bs-accordion-item value=1 title="TITLE1"}}CONTENT1{{/bs-accordion-item}}{{#bs-accordion-item value=2 title="TITLE2"}}CONTENT2{{/bs-accordion-item}}{{/bs-accordion}}`);
  assert.equal(this.$(':first-child').hasClass('panel-group'), true, 'accordion has panel-group class');
});

test('accordion with preselected item has this item expanded', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected}}{{#bs-accordion-item id="firstItem" value=1 title="TITLE1"}}CONTENT1{{/bs-accordion-item}}{{#bs-accordion-item id="secondItem" value=2 title="TITLE2"}}CONTENT2{{/bs-accordion-item}}{{/bs-accordion}}`);
  var item = this.$('#firstItem');

  assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
  assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
  assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');
});

test('changing selected item expands this item', function(assert) {
  this.set('selected', 1);
  this.render(hbs`{{#bs-accordion selected=selected}}{{#bs-accordion-item id="firstItem" value=1 title="TITLE1"}}CONTENT1{{/bs-accordion-item}}{{#bs-accordion-item id="secondItem" value=2 title="TITLE2"}}CONTENT2{{/bs-accordion-item}}{{/bs-accordion}}`);
  this.set('selected', 2);

  var item = this.$('#secondItem');
  var done = assert.async();

  // wait for transitions to complete
  setTimeout(() => {
    assert.equal(item.find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
    assert.equal(item.find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(item.find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');

    done();
  }, 500);
});

test('clicking collapsed item expands it', function(assert) {
  this.render(hbs`{{#bs-accordion}}{{#bs-accordion-item id="firstItem" value=1 title="TITLE1"}}CONTENT1{{/bs-accordion-item}}{{#bs-accordion-item id="secondItem" value=2 title="TITLE2"}}CONTENT2{{/bs-accordion-item}}{{/bs-accordion}}`);
  var item = this.$('#firstItem');
  var done = assert.async();

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
  this.render(hbs`{{#bs-accordion selected=1}}{{#bs-accordion-item id="firstItem" value=1 title="TITLE1"}}CONTENT1{{/bs-accordion-item}}{{#bs-accordion-item id="secondItem" value=2 title="TITLE2"}}CONTENT2{{/bs-accordion-item}}{{/bs-accordion}}`);
  var item = this.$('#firstItem');
  var done = assert.async();

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

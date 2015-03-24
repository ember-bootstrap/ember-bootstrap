import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-accordion-item', 'BsAccordionItemComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // appends the component to the page
    this.append();
    assert.equal(component._state, 'inDOM');
});


test('accordion item has correct default markup', function(assert) {
    assert.equal(this.$().hasClass('panel'), true, 'has panel class');
    assert.equal(this.$().hasClass('panel-default'), true, 'has panel-default class');
    assert.equal(this.$().find('.panel-heading').hasClass('collapsed'), true, 'panel-heading has collapsed class');
    assert.equal(this.$().find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(this.$().find('.panel-collapse').hasClass('in'), false, 'panel-collapse has not in class');
});

test('selected accordion item has correct default markup', function(assert) {
    var component = this.subject({
        value: 'x',
        parentView: Ember.Object.create({
            selected: 'x'
        })
    });
    assert.equal(this.$().find('.panel-heading').hasClass('collapsed'), false, 'panel-heading has not collapsed class');
    assert.equal(this.$().find('.panel-collapse').hasClass('collapse'), true, 'panel-collapse has collapse class');
    assert.equal(this.$().find('.panel-collapse').hasClass('in'), true, 'panel-collapse has in class');
});
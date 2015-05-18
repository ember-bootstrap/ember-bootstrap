import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-dropdown-button', 'BsDropdownButtonComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
    unit: true
});

test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // appends the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
});

test('dropdown button has correct default markup', function(assert) {
    assert.equal(this.$().prop('tagName'), 'BUTTON', 'dropdown button is a button');
    assert.equal(this.$().hasClass('dropdown-toggle'), true, 'has dropdown-toggle class');
    assert.equal(this.$().attr('data-toggle'), 'dropdown', 'has data-toggle=dropdown attribute');
    assert.equal(this.$().attr('role'), 'button', 'has role=button');
});

test('clicking dropdown button sends toggleDropdown action', function(assert) {
    var actionHandler = Ember.Controller.extend({
            actions: {
                toggleDropdown: function() {
                    assert.ok(true, 'toggleDropdown action has been called');
                }
            }
        }).create(),
        component = this.subject({
            targetObject: actionHandler
        });
    assert.expect(1);
    this.$().click();
});
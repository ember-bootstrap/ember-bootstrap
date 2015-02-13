import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-dropdown-toggle', 'BsDropdownToggleComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('toggle has correct default markup', function() {
    equal(this.$().prop('tagName'), 'A', 'toggle is an anchor tag by default');
    equal(this.$().attr('href'), '#', 'has href attribute');
    equal(this.$().hasClass('dropdown-toggle'), true, 'has dropdown-toggle class');
    equal(this.$().attr('data-toggle'), 'dropdown', 'has data-toggle=dropdown attribute');
    equal(this.$().attr('role'), 'button', 'has role=button');
});

test('toggle as button does not have href', function() {
    var component = this.subject({
        tagName: 'button'
    });
    equal(this.$().prop('tagName'), 'BUTTON', 'toggle is a button');
    equal(this.$().is('[href]'), false, 'does not have href attribute');
});

test('clicking toggle sends toggleDropdown action', function() {
    var actionHandler = Ember.Controller.extend({
            actions: {
                toggleDropdown: function() {
                    ok(true, 'toggleDropdown action has been called');
                }
            }
        }).create(),
        component = this.subject({
            targetObject: actionHandler
        });
    expect(1);
    this.$().click();
});
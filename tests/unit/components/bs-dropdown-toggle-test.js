import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-dropdown-toggle', 'BsDropdownToggleComponent', {
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

test('toggle has correct default markup', function(assert) {
    assert.equal(this.$().prop('tagName'), 'A', 'toggle is an anchor tag by default');
    assert.equal(this.$().attr('href'), '#', 'has href attribute');
    assert.equal(this.$().hasClass('dropdown-toggle'), true, 'has dropdown-toggle class');
    assert.equal(this.$().attr('data-toggle'), 'dropdown', 'has data-toggle=dropdown attribute');
    assert.equal(this.$().attr('role'), 'button', 'has role=button');
});

test('toggle as button does not have href', function(assert) {
    var component = this.subject({
        tagName: 'button'
    });
    assert.equal(this.$().prop('tagName'), 'BUTTON', 'toggle is a button');
    assert.equal(this.$().is('[href]'), false, 'does not have href attribute');
});

test('clicking toggle sends toggleDropdown action', function(assert) {
    var component = this.subject();
    var $component = this.$();
    assert.expect(1);
    var actionHandler = {
        toggleDropdown: function() {
            assert.ok(true, 'toggleDropdown action has been called');
        }
    };
    Ember.run(function(){
        component.setProperties({ 'targetObject': actionHandler });
    });
    Ember.run(function() {
        $component.click();
    });
});

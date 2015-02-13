import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-dropdown-menu', 'BsDropdownMenuComponent', {
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


test('dropdown menu has correct markup', function() {
    equal(this.$().prop("tagName"),'UL','menu is an unordered list (<ul>) by default');
    equal(this.$().hasClass('dropdown-menu'),true,'menu has dropdown-menu class');
});


test('dropdown menu has correct markup', function() {
    var component = this.subject({
        align: 'right'
    });
    equal(this.$().hasClass('dropdown-menu-right'),true,'menu has dropdown-menu-right class');
});

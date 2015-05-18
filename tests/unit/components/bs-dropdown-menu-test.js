import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-dropdown-menu', 'BsDropdownMenuComponent', {
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


test('dropdown menu has correct markup', function(assert) {
    assert.equal(this.$().prop("tagName"),'UL','menu is an unordered list (<ul>) by default');
    assert.equal(this.$().hasClass('dropdown-menu'),true,'menu has dropdown-menu class');
});


test('dropdown menu has correct markup', function(assert) {
    var component = this.subject({
        align: 'right'
    });
    assert.equal(this.$().hasClass('dropdown-menu-right'),true,'menu has dropdown-menu-right class');
});

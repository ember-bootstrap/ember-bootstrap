import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-button-group', 'BsButtonGroupComponent', {
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


test('button group has correct CSS classes', function() {
    var component = this.subject({
        size: 'lg',
        vertical: true,
        justified: true
    });

    equal(this.$().hasClass('btn-group'),true, 'has btn-group class');
    equal(this.$().hasClass('btn-group-lg'),true, 'has size class');
    equal(this.$().hasClass('btn-group-vertical'),true, 'has vertical class');
    equal(this.$().hasClass('btn-group-justified'),true, 'has justified class');
});
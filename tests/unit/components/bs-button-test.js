import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-button', 'BsButtonComponent', {
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



test('button has correct CSS classes', function() {
    var component = this.subject({
        type: 'primary'
    });

    equal(this.$().hasClass('btn'),true);
    equal(this.$().hasClass('btn-primary'),true);
});


test('button has HTML attributes', function() {
    var attrs = {
        id: 'test',
        disabled: true
    };

    var component = this.subject(attrs);

    for (var attr in attrs) {
        var value = attrs[attr] !== true ? attrs[attr] : attr;
        equal(this.$().attr(attr),value);
    }

});

test('button has default type "button"', function() {
    var component = this.subject();
    equal(this.$().attr('type'),'button');
});

test('buttonType property allows changing button type', function() {
    var component = this.subject({
        buttonType: 'submit'
    });
    equal(this.$().attr('type'),'submit');
});
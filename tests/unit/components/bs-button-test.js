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
        type: 'primary',
        size: 'lg',
        active: true,
        block: true
    });

    equal(this.$().hasClass('btn'),true, 'button has btn class');
    equal(this.$().hasClass('btn-primary'),true, 'button has type class');
    equal(this.$().hasClass('btn-lg'),true, 'button has size class');
    equal(this.$().hasClass('active'),true, 'button has active class');
    equal(this.$().hasClass('btn-block'),true, 'button has block class');
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

test('button has label', function() {
    var component = this.subject({
        label: 'test'
    });
    equal(this.$().text(),'test');
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


test('toggle button toggles active state when clicked', function() {
    var component = this.subject({
        toggle: true
    });
    equal(component.get('active'), false);
    this.$().click();
    equal(component.get('active'), true);
    this.$().click();
    equal(component.get('active'), false);

});
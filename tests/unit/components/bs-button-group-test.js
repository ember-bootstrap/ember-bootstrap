import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-button-group', 'BsButtonGroupComponent', {
  // specify the other units that are required for this test
  needs: ['component:bs-button', 'template:components/bs-button']
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


test('radio button group has value of selected button', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'radio'
        });

    for (var i=0;i<3;i++) {
        this.$().find('button').eq(i).click();
        equal(component.get('value'), i+1, 'value of button group must match that of clicked button');

        // check button's active property
        for (var k=0;k<3;k++) {
            equal(component.get('childButtons').objectAt(k).get('active'), i===k, 'only clicked button is active');
        }
    }
});


test('checkbox button group has value of all selected button', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'checkbox'
        }),
        expectedValue = [];

    for (var i=0;i<3;i++) {
        this.$().find('button').eq(i).click();
        expectedValue.push(i+1);
        deepEqual(component.get('value'), expectedValue, 'value of button group must match array of values of all active buttons');

        // check button's active property
        for (var k=0;k<3;k++) {
            equal(component.get('childButtons').objectAt(k).get('active'), k<=i, 'every clicked button is active');
        }
    }
});


test('radio button group with value set activates button with same value', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'radio',
            value: 1
        });

    this.append();

    equal(component.get('value'), 1, 'value must match set value');

    // check button's active property
    for (var k=0;k<3;k++) {
        equal(component.get('childButtons').objectAt(k).get('active'), 0===k, 'only button with same value is active');
    }
});


test('checkbox button group with value set activates buttons with same value', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        value = [1,3],
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'checkbox',
            value: value
        });

    this.append();

    deepEqual(component.get('value'), value, 'value must match set value');

    // check button's active property
    for (var k=0;k<3;k++) {
        equal(component.get('childButtons').objectAt(k).get('active'), value.contains(k+1), 'only buttons with value contained in set value are active');
    }
});

test('setting radio button group value activates button with same value', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'radio'
        });

    this.append();

    for (var i=0;i<3;i++) {
        /*jshint loopfunc: true */
        Ember.run(function(){
            component.set('value', i+1);
        });
        equal(component.get('value'), i+1, 'value must match set value');

        // check button's active property
        for (var k=0;k<3;k++) {
            equal(component.get('childButtons').objectAt(k).get('active'), i===k, 'only button with same value is active');
        }
    }
});



test('setting checkbox button group value with array of values activates buttons with same value', function() {
    var template = '{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}',
        component = this.subject({
            template: Ember.Handlebars.compile(template),
            type: 'checkbox'
        });

    this.append();

    var value = [1,3];
    Ember.run(function(){
        component.set('value', value);
    });
    deepEqual(component.get('value'), value, 'value must match set value');

    // check button's active property
    for (var k=0;k<3;k++) {
        equal(component.get('childButtons').objectAt(k).get('active'), value.contains(k+1), 'only buttons with value contained in set value are active');
    }
});
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';


moduleForComponent('bs-dropdown', 'BsDropdownComponent', {
  // specify the other units that are required for this test
  needs: ['component:bs-dropdown-button']
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



test('dropdown container has dropdown class', function() {
    equal(this.$().hasClass('dropdown'), true, 'has dropdown class');
});

test('dropdown container with dropdown button has btn-group class', function() {
    var component = this.subject({
        template: Ember.Handlebars.compile('{{#bs-dropdown-button}}Dropdown <span class="caret"></span>{{/bs-dropdown-button}}')
    });
    equal(this.$().hasClass('btn-group'), true, 'has btn-group class');
});

test('openDropdown action opens dropdown, closeDropdown closes it', function() {
    var component = this.subject();
    Ember.run(function(){
        component.send('openDropdown');
    });
    equal(this.$().hasClass('open'), true, 'has open class');
    equal(component.get('open'), true, 'open property is true');
    Ember.run(function(){
        component.send('closeDropdown');
    });
    equal(this.$().hasClass('open'), false, 'has not open class');
    equal(component.get('open'), false, 'open property is false');
});


test('toggleDropdown action toggles dropdown visibility', function() {
    var component = this.subject();
    Ember.run(function(){
        component.send('toggleDropdown');
    });
    equal(this.$().hasClass('open'), true, 'has open class');
    equal(component.get('open'), true, 'open property is true');
    Ember.run(function(){
        component.send('toggleDropdown');
    });
    equal(this.$().hasClass('open'), false, 'has not open class');
    equal(component.get('open'), false, 'open property is false');
});


test('opened dropdown will close on outside click', function() {
    var component = this.subject();
    Ember.run(function(){
        component.send('openDropdown');
    });
    this.$();
    Ember.$(document).click();
    equal(this.$().hasClass('open'), false, 'has not open class');
    equal(component.get('open'), false, 'open property is false');
});


test('clicking dropdown menu will close it', function() {
    var component = this.subject({
        template: Ember.Handlebars.compile('<ul class="dropdown-menu"><li>test</li></ul>')
    });
    Ember.run(function(){
        component.send('openDropdown');
    });
    this.$().find('.dropdown-menu').click();
    equal(this.$().hasClass('open'), false, 'has not open class');
    equal(component.get('open'), false, 'open property is false');
});



test('clicking dropdown menu when closeOnMenuClick is false will not close it', function() {
    var component = this.subject({
        template: Ember.Handlebars.compile('<ul class="dropdown-menu"><li>test</li></ul>'),
        closeOnMenuClick: false
    });
    Ember.run(function(){
        component.send('openDropdown');
    });
    this.$().find('.dropdown-menu').click();
    equal(this.$().hasClass('open'), true, 'has open class');
    equal(component.get('open'), true, 'open property is true');
});



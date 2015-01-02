import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

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

test('button has default label', function() {
    var component = this.subject({
        defaultText: 'test'
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


test('button with icon property shows icon', function() {
    var component = this.subject({
        icon: 'fa fa-check'
    });
    equal(this.$().find('i').hasClass('fa'),true);
    equal(this.$().find('i').hasClass('fa-check'),true);
});


test('button with iconActive and iconInactive properties shows icon depending on active state', function() {
    var component = this.subject({
        iconInactive: 'fa fa-plus',
        iconActive: 'fa fa-minus'
    });
    equal(this.$().find('i').hasClass('fa'),true);
    equal(this.$().find('i').hasClass('fa-plus'),true);

    Ember.run(function(){
        component.set('active', true);
    });

    equal(this.$().find('i').hasClass('fa'),true);
    equal(this.$().find('i').hasClass('fa-minus'),true);

    Ember.run(function(){
        component.set('active', false);
    });

    equal(this.$().find('i').hasClass('fa'),true);
    equal(this.$().find('i').hasClass('fa-plus'),true);
});

test('clicking a button sends default action with "value" property as a parameter', function() {
    var value = 'dummy';
    var testController = Ember.Controller.extend({
        actions: {
            testAction: function(actionParam) {
                equal(actionParam, value, 'action parameter matches value property');
            }
        }
    }).create();

    var component = this.subject({
        action: 'testAction',
        value: value,
        targetObject: testController
    });

    expect(1);
    this.$().click();
});

test('button text is changed according to button state', function() {
    var component = this.subject({
        defaultText: 'text1',
        loadingText: 'text2'
    });

    equal(this.$().text(),'text1');

    Ember.run(function(){
        component.set('textState', 'loading');
    });

    equal(this.$().text(),'text2');

    Ember.run(function(){
        component.resetState();
    });

    equal(this.$().text(),'text1');
});

test('setting reset to true resets button state', function() {
    var component = this.subject({
        defaultText: 'text1',
        loadingText: 'text2',
        textState: 'loading'
    });

    equal(this.$().text(),'text2');

    Ember.run(function(){
        component.set('reset', 1);
    });

    equal(this.$().text(),'text1');
});

test('clicking a button sends default action with callback, if promise is returned button state is changed according to promise state', function() {
    var promise,
        resolvePromise;
    var testController = Ember.Controller.extend({
        actions: {
            testAction: function(actionParam, evt, cb) {
                promise = new Ember.RSVP.Promise(function(resolve){
                    resolvePromise = resolve;
                });
                cb(promise);
            }
        }
    }).create();

    var component = this.subject({
        action: 'testAction',
        targetObject: testController,
        defaultText: 'default',
        pendingText: 'pending',
        resolvedText: 'resolved',
        rejectedText: 'rejected'
    });

    expect();
    this.$().click();
    equal(component.get('textState'), 'pending');
    equal(this.$().text(),'pending');

    Ember.run(function(){
        resolvePromise();
    });

    equal(component.get('textState'), 'resolved');
    equal(this.$().text(),'resolved');

});

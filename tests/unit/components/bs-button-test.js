import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-button', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
    unit: true
});

test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
});



test('button has correct CSS classes', function(assert) {
    var component = this.subject({
        type: 'primary',
        size: 'lg',
        active: true,
        block: true
    });

    assert.equal(this.$().hasClass('btn'),true, 'button has btn class');
    assert.equal(this.$().hasClass('btn-primary'),true, 'button has type class');
    assert.equal(this.$().hasClass('btn-lg'),true, 'button has size class');
    assert.equal(this.$().hasClass('active'),true, 'button has active class');
    assert.equal(this.$().hasClass('btn-block'),true, 'button has block class');
});


test('button has HTML attributes', function(assert) {
    var attrs = {
        id: 'test',
        disabled: true
    };

    var component = this.subject(attrs);

    for (var attr in attrs) {
        var value = attrs[attr] !== true ? attrs[attr] : attr;
        assert.equal(this.$().attr(attr),value);
    }

});

test('button has default label', function(assert) {
    var component = this.subject({
        defaultText: 'test'
    });
    assert.equal(this.$().text(),'test');
});

test('button has default type "button"', function(assert) {
    var component = this.subject();
    assert.equal(this.$().attr('type'),'button');
});

test('buttonType property allows changing button type', function(assert) {
    var component = this.subject({
        buttonType: 'submit'
    });
    assert.equal(this.$().attr('type'),'submit');
});


test('toggle button toggles active state when clicked', function(assert) {
    var component = this.subject({
        toggle: true
    });
    assert.equal(component.get('active'), false);
    this.$().click();
    assert.equal(component.get('active'), true);
    this.$().click();
    assert.equal(component.get('active'), false);

});


test('button with icon property shows icon', function(assert) {
    var component = this.subject({
        icon: 'fa fa-check'
    });
    assert.equal(this.$().find('i').hasClass('fa'),true);
    assert.equal(this.$().find('i').hasClass('fa-check'),true);
});


test('button with iconActive and iconInactive properties shows icon depending on active state', function(assert) {
    var component = this.subject({
        iconInactive: 'fa fa-plus',
        iconActive: 'fa fa-minus'
    });
    assert.equal(this.$().find('i').hasClass('fa'),true);
    assert.equal(this.$().find('i').hasClass('fa-plus'),true);

    Ember.run(function(){
        component.set('active', true);
    });

    assert.equal(this.$().find('i').hasClass('fa'),true);
    assert.equal(this.$().find('i').hasClass('fa-minus'),true);

    Ember.run(function(){
        component.set('active', false);
    });

    assert.equal(this.$().find('i').hasClass('fa'),true);
    assert.equal(this.$().find('i').hasClass('fa-plus'),true);
});

test('clicking a button sends default action with "value" property as a parameter', function(assert) {
    var value = 'dummy';
    var testController = Ember.Controller.extend({
        actions: {
            testAction: function(actionParam) {
                assert.equal(actionParam, value, 'action parameter matches value property');
            }
        }
    }).create();

    var component = this.subject({
        action: 'testAction',
        value: value,
        targetObject: testController
    });

    assert.expect(1);
    this.$().click();
});

test('button text is changed according to button state', function(assert) {
    var component = this.subject({
        defaultText: 'text1',
        loadingText: 'text2'
    });

    assert.equal(this.$().text(),'text1');

    Ember.run(function(){
        component.set('textState', 'loading');
    });

    assert.equal(this.$().text(),'text2');

    Ember.run(function(){
        component.resetState();
    });

    assert.equal(this.$().text(),'text1');
});

test('setting reset to true resets button state', function(assert) {
    var component = this.subject({
        defaultText: 'text1',
        loadingText: 'text2',
        textState: 'loading'
    });

    assert.equal(this.$().text(),'text2');

    Ember.run(function(){
        component.set('reset', 1);
    });

    assert.equal(this.$().text(),'text1');
});

test('clicking a button sends default action with callback, if promise is returned button state is changed according to promise state', function(assert) {
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

    assert.expect(4);
    this.$().click();
    assert.equal(component.get('textState'), 'pending');
    assert.equal(this.$().text(),'pending');

    Ember.run(function(){
        resolvePromise();
    });

    assert.equal(component.get('textState'), 'resolved');
    assert.equal(this.$().text(),'resolved');

});

//test('button supports ember-i18n if present', function(assert) {
//    Ember.I18n.translations = {
//        i18nKey: 'translated'
//    };
//    var component = this.subject({
//        defaultTextTranslation: 'i18nKey'
//    });
//
//    assert.equal(this.$().text(),'translated');
//});
import {
    moduleForComponent,
        test
} from 'ember-qunit';

moduleForComponent('bs-form-group', 'BsFormGroupComponent', {
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


test('component has form-group bootstrap class', function(assert) {
    var component = this.subject();
    assert.equal(component.get('classNames').contains('form-group'), true, 'component has form-group class');
});

var validations = {
    success: {
        formGroupClasses: ['has-feedback','has-success'],
        iconClasses: ['glyphicon','glyphicon-ok']
    },
    warning: {
        formGroupClasses: ['has-feedback','has-warning'],
        iconClasses: ['glyphicon','glyphicon-warning-sign']
    },
    error: {
        formGroupClasses: ['has-feedback','has-error'],
        iconClasses: ['glyphicon','glyphicon-remove']
    }
};

function testValidationState(assert, state) {
    var validationConfig = validations[state],
        component = this.subject({
            validation: state
        }),
        that = this;
    validationConfig.formGroupClasses.forEach(function(className) {
        assert.equal(that.$().hasClass(className), true, 'component has ' + className + ' class');

    });
    assert.equal(this.$().find('.form-control-feedback').length, 1, 'component has feedback icon');
    validationConfig.iconClasses.forEach(function(className) {
        assert.equal(that.$().find('.form-control-feedback').hasClass(className), 1, 'icon has ' + className +' class');

    });
}

test('component with successful validation has success classes and success icon', function(assert) {
    testValidationState.call(this, assert, 'success');
});

test('component with warning validation has warning classes and warning icon', function(assert) {
    testValidationState.call(this, assert, 'warning');
});

test('component with error validation has error classes and error icon', function(assert) {
    testValidationState.call(this, assert, 'error');
});

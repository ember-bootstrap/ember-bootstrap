import Ember from 'ember';

/**
 Extends Ember.Select to add Bootstrap's 'form-control' class.

 @class Input
 @namespace Components
 @extends Ember.Select
 */
export default Ember.Select.extend({
    classNames: ['form-control']
});
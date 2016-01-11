import Ember from 'ember';

/**
 Extends Ember.TextArea to add Bootstrap's 'form-control' class.

 @class Textarea
 @namespace Components
 @extends Ember.TextArea
 */
export default Ember.TextArea.extend({
    classNames: ['form-control']
});
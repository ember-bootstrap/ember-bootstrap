import Ember from 'ember';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';


/**
 Extends Ember.Select to add Bootstrap's 'form-control' class.

 ### I18n support

 Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
 See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}

 @class Select
 @namespace Components
 @extends Ember.Select
 @uses Mixins.I18nSupport
 */
export default Ember.Component.extend(I18nSupport, {
  tagName: 'select',
  classNames: ['form-control'],

  content: null,
  prompt: null,
  optionValuePath: 'id',
  optionLabelPath: 'title',
  action: Ember.K, // action to fire on change

  value: null,

  init() {
    this._super(...arguments);
    if (!this.get('content')) {
      this.set('content', []);
    }
  },

  change: function() {
    var selectEl = this.$().get(0);
    var selectedIndex = selectEl.selectedIndex;
    var content = this.get('content');

    // decrement index by 1 if we have a prompt
    var hasPrompt = !!this.get('prompt');
    var contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    var selection = content[contentIndex];

    // set the local, shadowed selection to avoid leaking
    // changes to `selection` out via 2-way binding
    this.set('value', selection);

    var changeCallback = this.get('action');
    changeCallback(selection);
  }

  
});
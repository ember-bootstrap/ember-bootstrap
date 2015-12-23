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
  attributeBindings: ['multiple'],

  content: null,
  prompt: null,
  optionValuePath: 'id',
  optionLabelPath: 'title',
  action: null,

  value: null,

  init() {
    this._super(...arguments);
    if (!this.get('content')) {
      this.set('content', []);
    }
  },

  change: function () {
    var selectEl = this.$().get(0);

    let selection = this.get('multiple') ? [] : {};
    let hasPrompt = !!this.get('prompt');
    var content = this.get('content');

    if (this.get('multiple')) {
      var selectedIndexes = selectEl.selectedOptions;

      for (var i = 0; i < selectedIndexes.length; i++) {
        let contentIndex = hasPrompt ? selectedIndexes.item(i).index - 1 : selectedIndexes.item(i).index;
        if (content.constructor && content.constructor === Array) {
          selection.push(content[contentIndex]);
        } else {
          selection.push(content.objectAt(contentIndex));
        }
      }
    } else {
      let selectedIndex = selectEl.selectedIndex;
      let contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
      if (content.constructor && content.constructor === Array) {
        selection = content[contentIndex];
      } else {
        selection = content.objectAt(contentIndex);
      }
    }

    // set the local, shadowed selection to avoid leaking
    // changes to `selection` out via 2-way binding
    this.set('value', selection);

    if (this.get('action')) {
      this.sendAction('action', selection);
    }
  }
});

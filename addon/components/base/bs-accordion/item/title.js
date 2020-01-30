import { action } from "@ember/object";
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/item/title';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName("")
@templateLayout(layout)
export default class AccordionItemTitle extends Component {
  @defaultValue
  ariaRole = 'tab';

  /**
   * @property collapsed
   * @type boolean
   * @public
   */

  /**
   * @property disabled
   * @type boolean
   * @private
   */

  /**
   * @event onClick
   * @public
   */
  onClick() {
  }

  @action
  handleClick(e) {
    e.preventDefault();
    if (!this.get('disabled')) {
      this.get('onClick')();
    }
  }
}

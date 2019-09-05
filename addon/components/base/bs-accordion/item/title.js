import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/title';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Ember.Component
 @public
 */
@templateLayout(layout)
@classNameBindings('collapsed:collapsed:expanded')
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

  click(e) {
    e.preventDefault();
    if (!this.get('disabled')) {
      this.get('onClick')();
    }
  }
}

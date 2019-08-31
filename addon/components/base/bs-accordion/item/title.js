import classic from 'ember-classic-decorator';
import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/title';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionTitle
 @namespace Components
 @extends Ember.Component
 @public
 */
@classic
@templateLayout(layout)
@classNameBindings('collapsed:collapsed:expanded')
export default class Title extends Component {
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
 onClick() {}

 click(e) {
   e.preventDefault();
   if (!this.get('disabled')) {
     this.get('onClick')();
   }
 }
}

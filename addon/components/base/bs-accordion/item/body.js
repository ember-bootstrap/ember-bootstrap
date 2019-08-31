import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/body';

/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionBody
 @namespace Components
 @extends Ember.Component
 @public
 */
@classic
@templateLayout(layout)
@tagName('')
export default class Body extends Component {
 /**
  * @property collapsed
  * @type boolean
  * @public
  */

 /**
  * @property collapseComponent
  * @type {String}
  * @private
  */
 collapseComponent = 'bs-collapse';
}

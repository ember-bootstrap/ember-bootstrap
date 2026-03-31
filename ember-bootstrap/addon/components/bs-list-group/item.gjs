import Component from '@glimmer/component';
import arg from '../../utils/decorators/arg';

/**
 * Component to create the items for [List Group](Components.ListGroup.html).
 *
 * @class ListGroupItem
 * @namespace Components
 * @extends Glimmer.Component
 * @public
 */
export default class BsListGroupItemComponent extends Component {
  /**
   * On of the allowed bs-types, e.g. `primary`, `secondary` etc.
   *
   * Used to add contextual classes to style list items with a stateful background and color.
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#contextual-classes)
   *
   * @default ''
   * @type string
   * @public
   */
  @arg
  type = '';

  /**
   * Used to create actionable list group items with hover, disabled, and active states.
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#links-and-buttons)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  actionable = false;

  /**
   * Indicate the current active selection.
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#active-items)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  active = false;

  /**
   * Set `true` to make list group item appear disabled.
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#disabled-items)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  disabled = false;

  /**
   * HTML-tag used for list-group item
   *
   * It depends on `actionable`.
   *
   * @type string
   * @default 'li'
   * @public
   */
  get htmlTag() {
    return this.args.actionable ? 'button' : 'li';
  }
}

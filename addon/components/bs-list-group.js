import Component from '@glimmer/component';
import arg from '../utils/decorators/arg';

/**
 Component for creating [Bootstrap List Groups](https://getbootstrap.com/docs/5.2/components/list-group/) with custom markup.

 ### Usage

 ```hbs
 <BsListGroup as |ListGroup|>
  <ListGroup.item>An item</ListGroup.item>
  <ListGroup.item>A second item</ListGroup.item>
  <ListGroup.item>A third item</ListGroup.item>
 </BsListGroup>
 ```

 ### Advanced Usage

 ```hbs
 <BsListGroup as |ListGroup|>
  {{#let (component ListGroup.item htmlTag="a" actionable=true) as |ListGroupItem|}}
    <ListGroupItem @active={{true}}>An item</ListGroupItem>
    <ListGroupItem>A second item</ListGroupItem>
    <ListGroupItem @disabled={{true}}>A third item</ListGroupItem>
  {{/let}}
 </BsListGroup>
 ```

 The component yields references to the following contextual components, that you can use to further customize the output:

 * [ListGroup.item](Components.ListGroupItem.html)

 @class ListGroup
 @namespace Components
 @extends Glimmer.Component
 @public
 */
export default class BsListGroupComponent extends Component {
  /**
   * Determines if list should be numbered (e.g. `ol` or `ul` should be used)
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#numbered)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  numbered = false;

  /**
   * If `true` then some borders and rounded corners are removed
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#flush)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  flush = false;

  /**
   * If `true` list group layout will be horizontal
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#horizontal)
   *
   * @default false
   * @type boolean
   * @public
   */
  @arg
  horizontal = false;

  /**
   * Determines the responsive variant to make a list group horizontal starting at that breakpoint’s `min-width`.
   *
   * Supported values are `{sm|md|lg|xl|xxl}`
   *
   * Live this property empty to change the layout of list group items to horizontal across all breakpoints.
   *
   * Also see the [Bootstrap Docs](https://getbootstrap.com/docs/5.2/components/list-group/#horizontal)
   *
   * @default ''
   * @type string
   * @public
   */
  @arg
  horizontalSize = '';

  htmlTag = this.numbered ? 'ol' : 'ul';

  get horizontalClass() {
    if (this.horizontal) {
      return this.horizontalSize
        ? `list-group-horizontal-${this.horizontalSize}`
        : 'list-group-horizontal';
    }
    return '';
  }
}

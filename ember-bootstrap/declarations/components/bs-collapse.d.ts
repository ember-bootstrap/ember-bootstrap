import Component from '@glimmer/component';
export interface BsCollapseSignature {
    Element: HTMLDivElement;
    Args: {
        collapsed?: boolean;
        collapseDimension?: 'height' | 'width';
        collapsedSize?: number;
        expandedSize?: number;
        transitionDuration?: number;
        onHidden?: (e?: Event) => void;
        onHide?: (e?: Event) => void;
        onShow?: (e?: Event) => void;
        onShown?: (e?: Event) => void;
    };
    Blocks: {
        default: [];
    };
}
/**
  An Ember component that mimics the behaviour of [Bootstrap's collapse.js plugin](http://getbootstrap.com/javascript/#collapse)

  ### Usage

  ```hbs
  <BsCollapse @collapsed={{this.collapsed}}>
    <div class="well">
      <h2>Collapse</h2>
      <p>This is collapsible content</p>
    </div>
  </BsCollapse>
  ```

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Collapse
  @namespace Components
  @extends Glimmer.Component
  @public
*/
export default class Collapse extends Component<BsCollapseSignature> {
    /**
     * @property _element
     * @type null | HTMLElement
     * @private
     */
    _element: HTMLElement | null;
    /**
     * Collapsed/expanded state
     *
     * @property collapsed
     * @type boolean
     * @default true
     * @public
     */
    collapsed: boolean;
    /**
     * True if this item is expanded
     *
     * @property active
     * @private
     */
    active: boolean;
    get collapse(): boolean;
    get showContent(): boolean;
    /**
     * true if the component is currently transitioning
     *
     * @property transitioning
     * @type boolean
     * @private
     */
    transitioning: boolean;
    /**
     * The size of the element when collapsed. Defaults to 0.
     *
     * @property collapsedSize
     * @type number
     * @default 0
     * @public
     */
    collapsedSize: number;
    /**
     * The size of the element when expanded. When null the value is calculated automatically to fit the containing elements.
     *
     * @property expandedSize
     * @type number
     * @default null
     * @public
     */
    expandedSize: null;
    /**
     * Calculates a hash for style attribute.
     */
    get cssStyle(): {
        [x: string]: string;
    };
    /**
     * Usually the size (height) of the element is only set while transitioning, and reseted afterwards. Set to true to always set a size.
     *
     * @property resetSizeWhenNotCollapsing
     * @type boolean
     * @default true
     * @private
     */
    resetSizeWhenNotCollapsing: boolean;
    /**
     * The direction (height/width) of the collapse animation.
     * When setting this to 'width' you should also define custom CSS transitions for the width property, as the Bootstrap
     * CSS does only support collapsible elements for the height direction.
     *
     * @property collapseDimension
     * @type string
     * @default 'height'
     * @public
     */
    collapseDimension: 'height' | 'width';
    /**
     * The duration of the fade transition
     *
     * @property transitionDuration
     * @type number
     * @default 350
     * @public
     */
    transitionDuration: number;
    collapseSize: number | null;
    /**
     * The action to be sent when the element is about to be hidden.
     *
     * @event onHide
     * @public
     */
    /**
     * The action to be sent after the element has been completely hidden (including the CSS transition).
     *
     * @event onHidden
     * @public
     */
    /**
     * The action to be sent when the element is about to be shown.
     *
     * @event onShow
     * @public
     */
    /**
     * The action to be sent after the element has been completely shown (including the CSS transition).
     *
     * @event onShown
     * @public
     */
    /**
     * Triggers the show transition
     *
     * @method show
     * @protected
     */
    show(): void;
    /**
     * Get the size of the element when expanded
     *
     * @method getExpandedSize
     * @param action
     * @return {Number}
     * @private
     */
    getExpandedSize(action: 'show' | 'hide'): number;
    /**
     * Triggers the hide transition
     *
     * @method hide
     * @protected
     */
    hide(): void;
    _onCollapsedChange(): void;
    _updateCollapsedSize(): void;
    _updateExpandedSize(): void;
}
//# sourceMappingURL=bs-collapse.d.ts.map
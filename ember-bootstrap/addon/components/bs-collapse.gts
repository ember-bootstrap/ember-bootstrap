import { action } from '@ember/object';
import Component from '@glimmer/component';
import { isNone } from '@ember/utils';
import { next } from '@ember/runloop';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { ref } from 'ember-ref-bucket';
import arg from '../utils/decorators/arg';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

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
  @ref('mainNode') _element: HTMLElement | null = null;

  /**
   * Collapsed/expanded state
   *
   * @property collapsed
   * @type boolean
   * @default true
   * @public
   */
  @arg
  collapsed = true;

  /**
   * True if this item is expanded
   *
   * @property active
   * @private
   */
  active = !this.collapsed;

  get collapse() {
    return !this.transitioning;
  }

  get showContent() {
    return this.collapse && this.active;
  }

  /**
   * true if the component is currently transitioning
   *
   * @property transitioning
   * @type boolean
   * @private
   */
  @tracked
  transitioning: boolean = false;

  /**
   * The size of the element when collapsed. Defaults to 0.
   *
   * @property collapsedSize
   * @type number
   * @default 0
   * @public
   */
  @arg
  collapsedSize = 0;

  /**
   * The size of the element when expanded. When null the value is calculated automatically to fit the containing elements.
   *
   * @property expandedSize
   * @type number
   * @default null
   * @public
   */
  @arg
  expandedSize = null;

  /**
   * Calculates a hash for style attribute.
   */
  get cssStyle() {
    if (isNone(this.collapseSize)) {
      return {};
    }

    return {
      [this.collapseDimension]: `${this.collapseSize}px`,
    };
  }

  /**
   * Usually the size (height) of the element is only set while transitioning, and reseted afterwards. Set to true to always set a size.
   *
   * @property resetSizeWhenNotCollapsing
   * @type boolean
   * @default true
   * @private
   */
  resetSizeWhenNotCollapsing = true;

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
  @arg
  collapseDimension: 'height' | 'width' = 'height';

  /**
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 350
   * @public
   */
  @arg
  transitionDuration = 350;

  @tracked
  collapseSize: number | null = null;

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
  show() {
    assert('Reference to collapse div element exists.', this._element);

    this.args.onShow?.();

    this.transitioning = true;
    this.active = true;
    this.collapseSize = this.collapsedSize;

    transitionEnd(this._element, this.transitionDuration).then(() => {
      if (this.isDestroyed) {
        return;
      }
      this.transitioning = false;
      if (this.resetSizeWhenNotCollapsing) {
        this.collapseSize = null;
      }
      this.args.onShown?.();
    });

    next(this, function () {
      if (!this.isDestroyed) {
        this.collapseSize = this.getExpandedSize('show');
      }
    });
  }

  /**
   * Get the size of the element when expanded
   *
   * @method getExpandedSize
   * @param action
   * @return {Number}
   * @private
   */
  getExpandedSize(action: 'show' | 'hide') {
    assert('Reference to collapse div element exists.', this._element);

    const expandedSize = this.expandedSize;
    if (expandedSize != null) {
      return expandedSize;
    }

    const collapseElement = this._element;
    const prefix = action === 'show' ? 'scroll' : 'offset';
    const measureProperty = `${prefix}${this.collapseDimension
      .substring(0, 1)
      .toUpperCase()}${this.collapseDimension.substring(1)}` as
      | 'scrollHeight'
      | 'scrollWidth'
      | 'offsetHeight'
      | 'offsetWidth';
    return collapseElement[measureProperty];
  }

  /**
   * Triggers the hide transition
   *
   * @method hide
   * @protected
   */
  hide() {
    assert('Reference to collapse div element exists.', this._element);

    this.args.onHide?.();

    this.transitioning = true;
    this.active = false;
    this.collapseSize = this.getExpandedSize('hide');

    transitionEnd(this._element, this.transitionDuration).then(() => {
      if (this.isDestroyed) {
        return;
      }
      this.transitioning = false;
      if (this.resetSizeWhenNotCollapsing) {
        this.collapseSize = null;
      }
      this.args.onHidden?.();
    });

    next(this, function () {
      if (!this.isDestroyed) {
        this.collapseSize = this.collapsedSize;
      }
    });
  }

  @action
  _onCollapsedChange() {
    const collapsed = this.collapsed;
    const active = this.active;
    if (collapsed !== active) {
      return;
    }
    if (collapsed === false) {
      this.show();
    } else {
      this.hide();
    }
  }

  @action
  _updateCollapsedSize() {
    if (
      !this.resetSizeWhenNotCollapsing &&
      this.collapsed &&
      !this.transitioning
    ) {
      this.collapseSize = this.collapsedSize;
    }
  }

  @action
  _updateExpandedSize() {
    if (
      !this.resetSizeWhenNotCollapsing &&
      !this.collapsed &&
      !this.transitioning
    ) {
      this.collapseSize = this.expandedSize;
    }
  }
}

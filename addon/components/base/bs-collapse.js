import { classNameBindings } from '@ember-decorators/component';
import { alias, and, not } from '@ember/object/computed';
import { addObserver } from '@ember/object/observers';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import '@ember/object';
import { next } from '@ember/runloop';
import { camelize } from '@ember/string';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { assert } from '@ember/debug';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

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

  @class Collapse
  @namespace Components
  @extends Ember.Component
  @public
*/
@classNameBindings('collapse', 'collapsing')
export default class Collapse extends Component {
  /**
   * Collapsed/expanded state
   *
   * @property collapsed
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  collapsed = true;

  /**
   * True if this item is expanded
   *
   * @property active
   * @private
   */
  @defaultValue
  active = !this.get('collapsed');

  @not('transitioning')
  collapse;

  @alias('transitioning')
  collapsing;

  @and('collapse', 'active')
  showContent;

  /**
   * true if the component is currently transitioning
   *
   * @property transitioning
   * @type boolean
   * @private
   */
  @defaultValue
  transitioning = false;

  /**
   * The size of the element when collapsed. Defaults to 0.
   *
   * @property collapsedSize
   * @type number
   * @default 0
   * @public
   */
  @defaultValue
  collapsedSize = 0;

  /**
   * The size of the element when expanded. When null the value is calculated automatically to fit the containing elements.
   *
   * @property expandedSize
   * @type number
   * @default null
   * @public
   */
  expandedSize = null;

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
  collapseDimension = 'height';

  /**
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 350
   * @public
   */
  transitionDuration = 350;

  setCollapseSize(size) {
    let dimension = this.get('collapseDimension');

    assert(`collapseDimension must be either "width" or "height". ${dimension} given.`, ["width", "height"].indexOf(dimension) !== -1);

    this.element.style.width = dimension === 'width' && size ? `${size}px` : '';
    this.element.style.height = dimension === 'height' && size ? `${size}px` : '';
  }

  /**
   * The action to be sent when the element is about to be hidden.
   *
   * @event onHide
   * @public
   */
  onHide() {}

  /**
   * The action to be sent after the element has been completely hidden (including the CSS transition).
   *
   * @event onHidden
   * @public
   */
  onHidden() {}

  /**
   * The action to be sent when the element is about to be shown.
   *
   * @event onShow
   * @public
   */
  onShow() {}

  /**
   * The action to be sent after the element has been completely shown (including the CSS transition).
   *
   * @event onShown
   * @public
   */
  onShown() {}

  /**
   * Triggers the show transition
   *
   * @method show
   * @protected
   */
  show() {
    this.get('onShow')();

    this.setProperties({
      transitioning: true,
      active: true
    });
    this.setCollapseSize(this.get('collapsedSize'));

    transitionEnd(this.get('element'), this.get('transitionDuration')).then(() => {
      if (this.get('isDestroyed')) {
        return;
      }
      this.set('transitioning', false);
      if (this.get('resetSizeWhenNotCollapsing')) {
        this.setCollapseSize(null);
      }
      this.get('onShown')();
    });

    next(this, function() {
      if (!this.get('isDestroyed')) {
        this.setCollapseSize(this.getExpandedSize('show'));
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
  getExpandedSize(action) {
    let expandedSize = this.get('expandedSize');
    if (isPresent(expandedSize)) {
      return expandedSize;
    }

    let collapseElement = this.get('element');
    let prefix = action === 'show' ? 'scroll' : 'offset';
    let measureProperty = camelize(`${prefix}-${this.get('collapseDimension')}`);
    return collapseElement[measureProperty];
  }

  /**
   * Triggers the hide transition
   *
   * @method hide
   * @protected
   */
  hide() {
    this.get('onHide')();

    this.setProperties({
      transitioning: true,
      active: false
    });
    this.setCollapseSize(this.getExpandedSize('hide'));

    transitionEnd(this.get('element'), this.get('transitionDuration')).then(() => {
      if (this.get('isDestroyed')) {
        return;
      }
      this.set('transitioning', false);
      if (this.get('resetSizeWhenNotCollapsing')) {
        this.setCollapseSize(null);
      }
      this.get('onHidden')();
    });

    next(this, function() {
      if (!this.get('isDestroyed')) {
        this.setCollapseSize(this.get('collapsedSize'));
      }
    });
  }

  _onCollapsedChange() {
    let collapsed = this.get('collapsed');
    let active = this.get('active');
    if (collapsed !== active) {
      return;
    }
    if (collapsed === false) {
      this.show();
    } else {
      this.hide();
    }
  }

  _updateCollapsedSize() {
    if (!this.get('resetSizeWhenNotCollapsing') && this.get('collapsed') && !this.get('collapsing')) {
      this.setCollapseSize(this.get('collapsedSize'));
    }
  }

  _updateExpandedSize() {
    if (!this.get('resetSizeWhenNotCollapsing') && !this.get('collapsed') && !this.get('collapsing')) {
      this.setCollapseSize(this.get('expandedSize'));
    }
  }

  init() {
    super.init(...arguments);

    addObserver(this, 'collapsed', null, this._onCollapsedChange, true);
    addObserver(this, 'collapsedSize', null, this._updateCollapsedSize, true);
    addObserver(this, 'expandedSize', null, this._updateExpandedSize, true);
  }
}

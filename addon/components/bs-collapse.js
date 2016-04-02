import Ember from 'ember';

const { computed, observer } = Ember;

/**
 An Ember component that mimics the behaviour of Bootstrap's collapse.js plugin, see http://getbootstrap.com/javascript/#collapse

 ```hbs
 {{#bs-collapse collapsed=collapsed}}
  <div class="well">
    <h2>Collapse</h2>
    <p>This is collapsible content</p>
  </div>
 {{/bs-collapse}}
 ```

 @class Collapse
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({

  classNameBindings: ['collapse', 'in', 'collapsing'],
  attributeBindings: ['style'],

  /**
   * Collapsed/expanded state
   *
   * @property collapsed
   * @type boolean
   * @default true
   * @public
   */
  collapsed: true,

  /**
   * True if this item is expanded
   *
   * @property active
   * @protected
   */
  active: false,

  collapse: computed.not('transitioning'),
  collapsing: computed.alias('transitioning'),
  'in': computed.and('collapse', 'active'),

  /**
   * true if the component is currently transitioning
   *
   * @property transitioning
   * @type boolean
   * @protected
   */
  transitioning: false,

  /**
   * @property collapseSize
   * @type number
   * @protected
   */
  collapseSize: null,

  /**
   * The size of the element when collapsed. Defaults to 0.
   *
   * @property collapsedSize
   * @type number
   * @default 0
   * @public
   */
  collapsedSize: 0,

  /**
   * The size of the element when expanded. When null the value is calculated automatically to fit the containing elements.
   *
   * @property expandedSize
   * @type number
   * @default null
   * @public
   */
  expandedSize: null,

  /**
   * Usually the size (height) of the element is only set while transitioning, and reseted afterwards. Set to true to always set a size.
   *
   * @property resetSizeWhenNotCollapsing
   * @type boolean
   * @default true
   * @private
   */
  resetSizeWhenNotCollapsing: true,

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
  collapseDimension: 'height',

  style: computed('collapseSize', function() {
    let size = this.get('collapseSize');
    let dimension = this.get('collapseDimension');
    if (Ember.isEmpty(size)) {
      return new Ember.Handlebars.SafeString('');
    }
    return new Ember.Handlebars.SafeString(`${dimension}: ${size}px`);
  }),

  /**
   * Triggers the show transition
   *
   * @method show
   * @protected
   */
  show() {
    let complete = function() {
        this.set('transitioning', false);
        if (this.get('resetSizeWhenNotCollapsing')) {
          this.set('collapseSize', null);
        }
        this.sendAction('didShow');
      };

    this.sendAction('willShow');

    this.setProperties({
      transitioning: true,
      collapseSize: this.get('collapsedSize'),
      active: true
    });

    if (!Ember.$.support.transition) {
      return complete.call(this);
    }

    this.$()
      .one('bsTransitionEnd', Ember.run.bind(this, complete))
      // @todo: make duration configurable
      .emulateTransitionEnd(350)
    ;

    Ember.run.next(this, function() {
      if (!this.get('isDestroyed')) {
        this.set('collapseSize', this.getExpandedSize('show'));
      }
    });
  },

  /**
   * Get the size of the element when expanded
   *
   * @method getExpandedSize
   * @param $action
   * @return {Number}
   * @private
   */
  getExpandedSize($action) {
    let expandedSize = this.get('expandedSize');
    if (Ember.isPresent(expandedSize)) {
      return expandedSize;
    }

    let collapseElement = this.$();
    let prefix = $action === 'show' ? 'scroll' : 'offset';
    let measureProperty = Ember.String.camelize(`${prefix}-${this.get('collapseDimension')}`);
    return collapseElement[0][measureProperty];
  },

  /**
   * Triggers the hide transition
   *
   * @method hide
   * @protected
   */
  hide() {

    let complete = function() {
        this.set('transitioning', false);
        if (this.get('resetSizeWhenNotCollapsing')) {
          this.set('collapseSize', null);
        }
        this.sendAction('didHide');
      };

    this.sendAction('willHide');

    this.setProperties({
      transitioning: true,
      collapseSize: this.getExpandedSize('hide'),
      active: false
    });

    if (!Ember.$.support.transition) {
      return complete.call(this);
    }

    this.$()
      .one('bsTransitionEnd', Ember.run.bind(this, complete))
      // @todo: make duration configurable
      .emulateTransitionEnd(350)
    ;

    Ember.run.next(this, function() {
      if (!this.get('isDestroyed')) {
        this.set('collapseSize', this.get('collapsedSize'));
      }
    });
  },

  _onCollapsedChange: observer('collapsed', function() {
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
  }),

  _onInit: Ember.on('init', function() {
    this.set('active', !this.get('collapsed'));
  }),

  _updateCollapsedSize: observer('collapsedSize', function() {
    if (!this.get('resetSizeWhenNotCollapsing') && this.get('collapsed') && !this.get('collapsing')) {
      this.set('collapseSize', this.get('collapsedSize'));
    }
  }),

  _updateExpandedSize: observer('expandedSize', function() {
    if (!this.get('resetSizeWhenNotCollapsing') && !this.get('collapsed') && !this.get('collapsing')) {
      this.set('collapseSize', this.get('expandedSize'));
    }
  })
});
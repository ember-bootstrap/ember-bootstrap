import Ember from 'ember';
import layout from '../templates/components/bs-tooltip';

const {
  Component,
  computed,
  isArray,
  isBlank,
  K,
  Object,
  run,
  $,
  run: {
    later,
    cancel,
    bind
  }
} = Ember;
const eventNamespace = 'tooltip';

const InState = Object.extend({
  hover: false,
  focus: false,
  click: false,
  in: computed.or('hover', 'focus', 'click')
});


export default Component.extend({
  layout,

  tagName: 'span',

  title: null,

  placement: 'top',

  visible: false,

  fade: true,

  in: computed.reads('visible'),

  delay: 0,

  delayShow: computed.reads('delay'),

  delayHide: computed.reads('delay'),

  hasDelayShow: computed.gt('delayShow', 0),
  hasDelayHide: computed.gt('delayHide', 0),

  transitionDuration: 150,

  /**
   * Use CSS transitions when showing/hiding?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  usesTransition: computed('fade', function() {
    return Ember.$.support.transition && this.get('fade');
  }),

  /**
   * The id of the `.tooltip` element.
   *
   * @property tooltipId
   * @type string
   * @readonly
   * @private
   */
  tooltipId: computed('elementId', function() {
    return `${this.get('elementId')}-tooltip`;
  }),

  /**
   * The jQuery object of the `.tooltip` element.
   *
   * @property tooltipElement
   * @type object
   * @readonly
   * @private
   */
  tooltipElement: computed('tooltipId', function() {
    return Ember.$(`#${this.get('tooltipId')}`);
  }).volatile(),

  triggerTarget: null,

  /**
   * @property triggerTargetElement
   * @type {jQuery}
   * @private
   */
  triggerTargetElement: computed('triggerTarget', function() {
    let triggerTarget = this.get('triggerTarget');

    if (isBlank(triggerTarget)) {
      return this.$().parent();
    } else {
      return $(triggerTarget);
    }
  }),

  /**
   * @property triggerEvents
   * @type array|string
   * @public
   */
  triggerEvents: 'hover focus',

  _triggerEvents: computed('triggerEvents', function() {
    let events = this.get('triggerEvents');
    if (!isArray(events)) {
      events = events.split(' ');
    }

    return events.map((event) => {
        switch (event) {
          case 'hover':
            return ['mouseenter', 'mouseleave'];
          case 'focus':
            return ['focusin', 'focusout'];
          default:
            return event;
        }
      }
    );
  }),

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */
  renderInPlace: false,

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  _renderInPlace: computed('renderInPlace', function() {
    return this.get('renderInPlace') || typeof Ember.$ !== 'function' || Ember.$('#ember-bootstrap-modal-container').length === 0;
  }),

  /**
   * Current hover state, 'in', 'out' or null
   *
   * @property hoverState
   * @type string
   * @private
   */
  hoverState: null,

  /**
   * Current state for events
   *
   * @property inState
   * @type {InState}
   * @private
   */
  inState: computed(function() {
    return InState.create();
  }),

  /**
   * Ember.run timer
   *
   * @property timer
   * @private
   */
  timer: null,

  /**
   * @event onShow
   * @public
   */
  onShow: K,

  /**
   * @event onShown
   * @public
   */
  onShown: K,

  /**
   * @event onHide
   * @public
   */
  onHide: K,

  /**
   * @event onHidden
   * @public
   */
  onHidden: K,


  enter(e) {
    if (e) {
      let eventType = e.type === 'focusin' ? 'focus' : 'hover';
      this.get('inState').set(eventType, true);
    }

    if (this.get('in') || this.get('hoverState') === 'in') {
      this.set('hoverState', 'in');
      return;
    }

    cancel(this.timer);

    this.set('hoverState', 'in');

    if (!this.get('hasDelayShow')) {
      return this.show();
    }

    this.timer = later(this, function() {
      if (this.get('hoverState') === 'in') {
        this.show();
      }
    }, this.get('delayShow'));
  },

  leave(e) {
    if (e) {
      let eventType = e.type === 'focusin' ? 'focus' : 'hover';
      this.get('inState').set(eventType, false);
    }

    if (this.get('inState.in')) {
      return;
    }

    cancel(this.timer);

    this.set('hoverState', 'out');

    if (!this.get('hasDelayShow')) {
      return this.hide();
    }

    this.timer = later(this, function() {
      if (this.get('hoverState') === 'out') {
        this.hide();
      }
    }, this.get('delayHide'));
  },

  toggle(e) {
    if (e) {
      this.get('inState').toggleProperty('click');
      if (this.get('inState.in')) {
        this.enter();
      } else {
        this.leave();
      }
    } else {
      if (this.get('in')) {
        this.leave();
      } else {
        this.enter();
      }
    }
  },

  show() {

    if (false === this.get('onShow')(this)) {
      return;
    }

    // this.$element.attr('aria-describedby', tipId) @todo ?

    // @todo auto placement
    // var autoToken = /\s?auto?\s?/i
    // var autoPlace = autoToken.test(placement)
    // if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

    // $tip.css({ top: 0, left: 0, display: 'block' })

    // @todo add to bs-tooltip-element ?
    // var pos = this.getPosition()
    // var actualWidth = $tip[0].offsetWidth
    // var actualHeight = $tip[0].offsetHeight
    //
    // if (autoPlace) {
    //   var orgPlacement = placement
    //   var viewportDim = this.getPosition(this.$viewport)
    //
    //   placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' :
    //     placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' :
    //       placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' :
    //         placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' :
    //           placement
    //
    //   $tip
    //     .removeClass(orgPlacement)
    //     .addClass(placement)
    // }
    //
    // var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
    //
    // this.applyPlacement(calculatedOffset, placement)

    this.set('in', true);

    function tooltipShowComplete() {
      let prevHoverState = this.get('hoverState');

      this.get('onShown')(this);
      this.set('hoverState', null);

      if (prevHoverState === 'out') {
        this.leave();
      }
    };

    if (this.get('usesTransition')) {
      this.get('tooltipElement')
        .one('bsTransitionEnd', bind(this, tooltipShowComplete))
        .emulateTransitionEnd(this.get('transitionDuration'));
    } else {
      tooltipShowComplete.call(this);
    }
  },

  hide() {

    if (false === this.get('onHide')(this)) {
      return;
    }

    function tooltipHideComplete() {
      // if (that.hoverState != 'in') $tip.detach()

      // callback && callback()
      this.get('onHidden')(this);
    }

    this.set('in', false);

    if (this.get('usesTransition')) {
      this.get('tooltipElement')
        .one('bsTransitionEnd', bind(this, tooltipHideComplete))
        .emulateTransitionEnd(this.get('transitionDuration'));
    } else {
      tooltipHideComplete.call(this);
    }

    this.set('hoverState', null);
  },

  addListeners() {
    let $target = this.get('triggerTargetElement');

    this.get('_triggerEvents')
      .forEach((event) => {
        if (isArray(event)) {
          let [inEvent, outEvent] = event;
          $target.on(`${inEvent}.${eventNamespace}`, run.bind(this, this.enter));
          $target.on(`${outEvent}.${eventNamespace}`, run.bind(this, this.leave));
        }
        else {
          $target.on(`${event}.${eventNamespace}`, run.bind(this, this.toggle));
        }
      });
  },

  removeListeners() {
    this.get('triggerTargetElement')
      .off(`.${eventNamespace}`);
  },

  didInsertElement() {
    this._super(...arguments);
    this.addListeners();
  },

  willRemoveElement() {
    this._super(...arguments);
    this.removeListeners();
  }


});

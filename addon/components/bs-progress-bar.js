import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';

export default Ember.Component.extend(TypeClass, {
  classNames: ['progress-bar'],
  classNameBindings: ['progressBarStriped','active'],

  attributeBindings: ['style','ariaValuenow','ariaValuemin','ariaValuemax'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'progress-bar'
   * @protected
   */
  classTypePrefix: 'progress-bar',

  minValue: 0,
  maxValue: 100,
  value: 0,
  showLabel: false,
  striped: false,
  animate: false,
  roundDigits: 0,

  progressBarStriped: Ember.computed.alias('striped'),
  active: Ember.computed.alias('animate'),

  ariaValuenow: Ember.computed.alias('value'),
  ariaValuemin: Ember.computed.alias('minValue'),
  ariaValuemax: Ember.computed.alias('maxValue'),

  percent: Ember.computed('value','minValue','maxValue', function() {
    var value = parseFloat(this.get('value')),
      minValue = parseFloat(this.get('minValue')),
      maxValue = parseFloat(this.get('maxValue'));

    return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1) * 100;
  }),

  percentRounded: Ember.computed('percent','roundDigits', function() {
    var roundFactor = Math.pow(10, this.get('roundDigits'));
    return Math.round(this.get('percent') * roundFactor) / roundFactor;
  }),

  style: Ember.computed('percent', function() {
    var percent = this.get('percent');
    return new Ember.Handlebars.SafeString(`width: ${percent}%`);
 })

});

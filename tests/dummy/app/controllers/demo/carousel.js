import Ember from 'ember';

export default Ember.Controller.extend({
  autoPlay: false,
  continuouslyCycle: true,
  index: 0,
  interval: 5000,
  keyboard: true,
  ltr: true,
  pauseOnMouseEnter: true,
  showControls: true,
  showIndicators: true
});

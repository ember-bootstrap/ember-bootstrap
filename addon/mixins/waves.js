import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['wavesClass', 'wavesClass:waves-effect'],
  wavesClass: 'waves-light'
});

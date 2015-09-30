import Ember from 'ember';
import layout from '../templates/components/waves-effect';
import Waves from '../mixins/waves';

export default Ember.Component.extend(Waves, {
  layout: layout,
  classNames: ["waves-container"]
});

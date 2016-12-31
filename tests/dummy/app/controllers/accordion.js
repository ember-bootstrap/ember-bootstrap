import Ember from 'ember';

export default Ember.Controller.extend({
  selected: '1',

  actions: {
    select(selected) {
      this.set('selected', selected);
    }
  }
});

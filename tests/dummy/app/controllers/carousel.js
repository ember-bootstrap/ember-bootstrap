import Ember from 'ember';

export default Ember.Controller.extend({
	slideNumber: 1,
	actions: {
		slideChanged(slideNumber)
		{
			 this.set('slideNumber', slideNumber+1)
		}
	}
});

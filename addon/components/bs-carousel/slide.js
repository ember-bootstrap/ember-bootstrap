import Ember from 'ember';
import layout from '../../templates/components/bs-carousel/slide';
const {
	Component
} = Ember;

export default Component.extend({
	layout,
	classNames: ['item'],
	tagName: null,

	/**
	 * Initialize properties for the component with defaults.
	 */
	init()
	{
		this._super(...arguments);

		this.setProperties({"emberId": this.getWithDefault("emberId", null), "pic": this.getWithDefault('pic', null)});
	},

	/**
	 * Fires when the component is inserted into the DOM.
	 * Let the parent component (bs-carousel) know a slide is inserted into the DOM - DDAU
	 */
	didInsertElement()
	{
		this._super(...arguments);

		this.sendAction('addSlide', this.$());
	}
});

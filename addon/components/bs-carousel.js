import Ember from 'ember';
import layout from '../templates/components/bs-carousel';

const
	{
		Component,
		computed,
		uuid,
		run: {later},
		String: {htmlSafe}
	} = Ember;

export default Component.extend({
	layout,

	style: computed('imageHeight', function() {
		let imageHeight = this.get('imageHeight');
		return htmlSafe(`height: ${imageHeight}px`);
	}),

	// TODO: Add option to pause slides on mouseOver.

	/**
	 * Initialization: Set up default properties and values.
	 */
	init: function()
	{
		this._super(...arguments);

		this.set('carouselId', 'carousel-' + uuid());
		this.set('currentSlideNumber', 0);
		this.set('slides', []);
		this.set('_seconds', 0);
		this.set('_tickerId', null);
		this.set('showIndicators', this.getWithDefault('showIndicators', true));
		this.set('interval', this.getWithDefault('interval', 0));
		this.set('animate', this.getWithDefault('animate', true));
		this.set('imageHeight', this.getWithDefault('imageHeight', 500));
		this.set('imageWidth', this.getWithDefault('imageWidth', '100%'));


		// TODO: Allow user to set if slide wrap or not.
		// this.set('wrap', this.getWithDefault('wrap', true));

		// Send an action up when a slide changes.
		this.addObserver('currentSlideNumber', this, 'slideChanging');

		// Set up a timer to fire every second and include it in the Ember event loop.
		let self = this;
		later(self, function ()
		{
			let ticker = setInterval(function()
			{
				self.tick();
			}, 1000);
			self.set('_tickerId', ticker);
		}, 1000);

		// Force the event for the first slide.
		this.slideChanging();
	},

	/**
	 * The tick() function executes every second so the slides can cycle at a given interval.
	 */
	tick()
	{
		let interval = this.get('interval');
		if (interval !== 0)
		{
			let seconds = this.incrementProperty('_seconds');
			if (interval === seconds)
			{
				this.set('_seconds', 0);
				this.send('next');
			}
		}
	},

	/**
	 * Fires when the component is about to be removed from the DOM.
	 */
	willDestroyElement()
	{
		this._super(...arguments);

		// Remove the timer.
		clearInterval(this.get('_tickerId'));
	},

	/**
	 * Fires when any element in the component is clicked.
	 * Because the slide indicators are added dynamically to the DOM we can't use the standard click action.
	 * So we check if the element clicked is an indicator and if so we act accordingly.
	 *
	 * @param e - click event object
	 */
	click(e)
	{
		// Is the target element a slide-indicator?
		let target = e.target;
		target = this.$(target);
		if (target.hasClass('slide-indicator'))
		{
			// If a slide indicator is clicked on that is not the active slide indicator we update everything.
			let currentSlideNumber = this.get('currentSlideNumber');

			let id = target.attr('id');
			let indicators = this.$('#indicator-' + this.get('carouselId') + ' > li');
			let nextSlideNumber = -1;
			for (let indicator of indicators)
			{
				let o = this.$(indicator);
				if (o.attr('id') === id)
				{
					nextSlideNumber = o.attr('data-slide-to');
				}
			}

			// If we need to update the active slide we do so.
			if (nextSlideNumber !== currentSlideNumber)
			{
				let nextSlide = this.getSlide(nextSlideNumber);
				let activeSlide = this.getSlide(currentSlideNumber);
				this.set('currentSlideNumber', nextSlideNumber);
				this.updateSlide(activeSlide, nextSlide);
			}
		}
	},

	/**
	 * Fires when this component is inserted into the DOM.
	 */
	didInsertElement()
	{
		// Show the first slide.
		let firstSlide = this.getSlide(0);
		firstSlide.addClass('active');
		this.updateIndicator();
	},

	/**
	 * Helper function get the slide via the slide number.
	 *
	 * @param slideNumber
	 * @returns {slide}
	 */
	getSlide(slideNumber)
	{
		if (slideNumber == null)
		{
			slideNumber = this.get('currentSlideNumber');
		}
		return this.slides[slideNumber];
	},

	/**
	 * Set the active indicator.
	 *
	 */
	updateIndicator()
	{
		// No need to update indicators if we're not showing them.
		if (this.get('showIndicators') === false)
		{
			return;
		}

		// Get the current slide number and make sure it is an int type.
		let currentSlideNumber = this.get('currentSlideNumber');
		currentSlideNumber = parseInt(currentSlideNumber);

		// Iterate through all indicator elements and set the indicator to the current slide number.
		let indicators = this.$('#indicator-' + this.get('carouselId') + ' > li');
		for (let indicator of indicators)
		{
			// Remove the active from indicator if it was already there.
			let o = this.$(indicator);
			o.removeClass('active');

			// Get the slide number of the indicator and set it to an int type.
			let slideNumber = o.attr('data-slide-to');
			slideNumber = parseInt(slideNumber);

			// If the slideNumber is the currentSlide number then we set this indicator as the active indicator.
			if (slideNumber === currentSlideNumber)
			{
				o.addClass('active');
			}
		}
	},

	/**
	 * Called any time the slide changes
	 * This in turn bubbles up the slideChanged action -- DDAU
	 */
	slideChanging()
	{
		this.sendAction('slideChanged', this.get('currentSlideNumber'));
	},

	/**
	 * Actions for the carousel component
	 */
	actions:
	{
		/**
		 * Fires when a slide is inserted into the DOM.
		 *
		 * @param slide
		 */
		addSlide(slide)
		{
			// TODO: Use htmlSafe and pass the height/width as shared parameters to the slide components.
			// Set the slide dimensions to the parameters of the carousel.
			let imageHeight = this.get('imageHeight') + 'px';
			let imageWidth = this.get('imageWidth');
			slide.css({"height": imageHeight, "width": imageWidth});

			let img = slide.find('img');
			img.css({"position": "absolute", "top": 0, "left": 0, "min-width": imageWidth, "height": imageHeight});

			// Save the slide in the slides array
			this.slides.push(slide);

			// Dynamically add the <li> tags for the indicator into the DOM
			let carouselId = this.get('carouselId');
			let indicator = this.$('#indicator-' + carouselId);
			let slideCount = this.slides.length-1;
			let slideNumberIndicator = 'indicator-' + carouselId + '-' + slideCount.toString();
			indicator.append('<li id="'+ slideNumberIndicator + '" class="slide-indicator" data-slide-to="' + slideCount.toString() + '"></li>');
		},

		/**
		 * Fires when the next button has been clicked.
		 */
		next()
		{
			let currentSlideNumber = this.get('currentSlideNumber');
			let activeSlide = this.getSlide(currentSlideNumber);

			currentSlideNumber++;
			if (currentSlideNumber > this.slides.length - 1)
			{
				currentSlideNumber = 0;
			}
			this.set('currentSlideNumber', currentSlideNumber);

			let nextSlide = this.getSlide(currentSlideNumber);

			this.updateSlide(activeSlide, nextSlide);
		},

		/**
		 * Fires when the previous button is clicked
		 */
		prev()
		{
			let currentSlideNumber = this.get('currentSlideNumber');
			let activeSlide = this.getSlide(currentSlideNumber);

			currentSlideNumber--;
			if (currentSlideNumber < 0)
			{
				currentSlideNumber = this.slides.length-1;
			}
			this.set('currentSlideNumber', currentSlideNumber);

			let nextSlide = this.getSlide(currentSlideNumber);

			this.updateSlide(activeSlide, nextSlide);
		}
	},

	updateSlide(activeSlide, nextSlide)
	{
		// TODO: Allow fadeOut/fadeIn timings to be set by user.
		// TODO: Figure out how to use transition.js instead of fadeIn/FadeOut
		// TODO: Check animation state to prevent multiple slides becoming active.
		if (this.get('animate') === true)
		{
			activeSlide.fadeOut(500, function ()
			{
				activeSlide.removeClass('active');
				nextSlide.fadeIn(500);
				nextSlide.addClass('active');
			});
		}
		else
		{
			activeSlide.removeClass('active');
			nextSlide.addClass('active');
		}
		this.updateIndicator();
	}
});

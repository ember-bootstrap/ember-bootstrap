import Ember from 'ember';
import layout from '../templates/components/bs-nav';

const { isPresent } = Ember;

/**

 
 
 
 ### Usage

 ```hbs
 {{#bs-nav type="pills"}}
   {{#bs-nav-item}}
      {{#link-to "foo"}}Foo{{/link-to}}
   {{/bs-nav-item}}
   {{#bs-nav-item}}
     {{#link-to "bar"}}Bar{{/link-to}}
   {{/bs-nav-item}}
 {{/bs-nav}}
 ```

 ### Active items

 Bootstrap expects to have the `active` class on the `<li>` element that should be the active link. 

 @class Nav
 @namespace Components
 @extends Ember.Component
 @public

 */
export default Ember.Component.extend({
  layout,

  tagName: 'ul',
  classNames: ['nav'],

  classNameBindings: ['typeClass', 'justified:nav-justified', 'stacked:nav-stacked'],

  typeClass: Ember.computed('type', function() {
    let type = this.get('type');
    if (isPresent(type)) {
      return `nav-${type}`;
    }
  }),

  /**
   * Special type of nav, either "pills" or "tabs"
   *
   * @property type
   * @type String
   * @default null
   * @public
   */
  type: null,

  /**
   * Make the nav justified, see [bootstrap docs](http://getbootstrap.com/components/#nav-justified)
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  justified: false,

  /**
   * Make the nav pills stacked, see [bootstrap docs](http://getbootstrap.com/components/#nav-pills)
   *
   * @property stacked
   * @type boolean
   * @default false
   * @public
   */
  stacked: false
});

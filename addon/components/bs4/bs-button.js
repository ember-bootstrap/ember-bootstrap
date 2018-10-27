import Button from 'ember-bootstrap/components/base/bs-button';

export default Button.extend({
  type: 'secondary',
  classNameBindings: ['outline:btn-outline'],

  /**
   * Property to create outline buttons (BS4+ only)
   *
   * @property disabled
   * @type boolean
   * @default false
   * @public
   */
  outline: false
});

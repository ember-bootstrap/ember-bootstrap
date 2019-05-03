import ButtonGroup from 'ember-bootstrap/components/base/bs-button-group';

export default ButtonGroup.extend({
  classNameBindings: ['justified:btn-group-justified'],

  /**
   * Set to true for the buttons to stretch at equal sizes to span the entire width of its parent.
   *
   * *Important*: You have to wrap every button component in a `div class="btn-group">`:
   *
   * ```handlebars
   * <div class="btn-group" role="group">
   * {{#bs-button}}My Button{{/bs-button}}
   * </div>
   * ```
   *
   * See http://getbootstrap.com/components/#btn-groups-justified
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  justified: false
});

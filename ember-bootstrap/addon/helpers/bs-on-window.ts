import GlobalEventListenerHelper from '../utils/global-event-listener-helper';

/**
 * Adds an event listener to `window` for as long as the helper is rendered:
 * `{{bsOnWindow "resize" this.handler}}`
 *
 * @class BsOnWindowHelper
 * @private
 */
export default class BsOnWindowHelper extends GlobalEventListenerHelper<WindowEventMap> {
  get eventTarget() {
    return typeof window !== 'undefined' ? window : undefined;
  }
}

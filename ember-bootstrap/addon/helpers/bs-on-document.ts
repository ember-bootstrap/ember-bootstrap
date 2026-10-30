import GlobalEventListenerHelper from '../utils/global-event-listener-helper';

/**
 * Adds an event listener to `document` for as long as the helper is rendered:
 * `{{bsOnDocument "click" this.handler capture=true}}`
 *
 * @class BsOnDocumentHelper
 * @private
 */
export default class BsOnDocumentHelper extends GlobalEventListenerHelper<DocumentEventMap> {
  get eventTarget() {
    return typeof document !== 'undefined' ? document : undefined;
  }
}

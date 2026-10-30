import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

export interface GlobalEventListenerSignature<EventMap> {
  Args: {
    Positional: [
      eventName: keyof EventMap & string,
      callback: (event: Event) => void,
    ];
    Named: Pick<AddEventListenerOptions, 'capture' | 'once' | 'passive'>;
  };
  Return: void;
}

type Positional<EventMap> =
  GlobalEventListenerSignature<EventMap>['Args']['Positional'];
type Named<EventMap> = GlobalEventListenerSignature<EventMap>['Args']['Named'];

interface Listener {
  target: EventTarget;
  eventName: string;
  callback: (event: Event) => void;
  options: AddEventListenerOptions;
}

/**
 * Base class for the `bs-on-document` and `bs-on-window` helpers. It adds an event listener to the global event
 * target returned by `eventTarget`, replaces it when the arguments change, and removes it when the helper is
 * destroyed. Named arguments (e.g. `capture=true`) are passed as listener options.
 *
 * When the global is missing or is not an event target (FastBoot defines a `window` without `addEventListener`), it
 * does nothing.
 *
 * @class GlobalEventListenerHelper
 * @private
 */
export default class GlobalEventListenerHelper<EventMap> extends Helper<
  GlobalEventListenerSignature<EventMap>
> {
  /**
   * @property eventTarget
   * @type EventTarget|undefined
   * @private
   */
  get eventTarget(): EventTarget | undefined {
    return undefined;
  }

  listener: Listener | null = null;

  compute(
    [eventName, callback]: Positional<EventMap>,
    options: Named<EventMap>,
  ) {
    assert(
      `The event name passed to ${this.constructor.name} must be a string`,
      typeof eventName === 'string',
    );
    assert(
      `The callback passed to ${this.constructor.name} must be a function`,
      typeof callback === 'function',
    );

    this.removeListener();

    const target = this.eventTarget;
    if (typeof target?.addEventListener === 'function') {
      const listenerOptions = { ...options };
      target.addEventListener(eventName, callback, listenerOptions);
      this.listener = {
        target,
        eventName,
        callback,
        options: listenerOptions,
      };
    }
  }

  removeListener() {
    if (this.listener) {
      const { target, eventName, callback, options } = this.listener;
      target.removeEventListener(eventName, callback, options);
      this.listener = null;
    }
  }

  willDestroy() {
    super.willDestroy();
    this.removeListener();
  }
}

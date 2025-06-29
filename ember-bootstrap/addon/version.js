import { getOwnConfig } from '@embroider/macros';
import { libraries } from '@ember/-internals/metal';

export const VERSION = getOwnConfig().version;

export function registerLibrary() {
  libraries.register('Ember Bootstrap', VERSION);
}

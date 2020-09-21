import { computed } from '@ember/object';
import { macroCondition, getOwnConfig } from '@embroider/macros';

export default function defaultValue(target, key, descriptor) {
  let { initializer, value } = descriptor;

  return computed({
    get() {
      return initializer ? initializer.call(this) : value;
    },
    set(_, v) {
      if (macroCondition(getOwnConfig().useDefaultValueIfUndefined)) {
        if (v !== undefined) {
          return v;
        }

        return initializer ? initializer.call(this) : value;
      } else {
        return v;
      }
    },
  })(target, key, { ...descriptor, value: undefined, initializer: undefined });
}

import { computed } from '@ember/object';

export default function defaultValue(target, key, descriptor) {
  let { initializer, value } = descriptor;

  return computed({
    get() {
      return initializer ? initializer.call(this) : value;
    },
    set(_, v) {
      if (v !== undefined) {
        return v;
      }

      return initializer ? initializer.call(this) : value;
    },
  })(target, key, { ...descriptor, value: undefined, initializer: undefined });
}

import { computed } from '@ember/object';

export default function defaultValue(target, key, descriptor) {
  let { initializer, value } = descriptor;
  let _val = undefined;
  let resultDescriptor = computed({
    get() {
      return _val !== undefined ? _val : (initializer ? initializer.call(this) : value);
    },
    set(_, v) {
      return v;
    }
  })(target, key, { ...descriptor, value: undefined, initializer: undefined });

  return {
    ...resultDescriptor,
    set(val) {
      _val = val;
    }
  };
}

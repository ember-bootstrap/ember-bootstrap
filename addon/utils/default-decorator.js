export default function defaultValue(target, key, descriptor) {
  let { initializer, value } = descriptor;
  return {
    ...descriptor,

    get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      let ret = initializer ? initializer.call(this) : value;

      return ret;
    },

    set: createDefaultSetter(key)
  };
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

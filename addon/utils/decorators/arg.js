export default function arg(target, key, descriptor) {
  let defaultValue = descriptor.initializer ? descriptor.initializer() : undefined;

  return {
    get() {
      const argValue = this.args[key];
      return argValue !== undefined ? argValue : defaultValue;
    },
  };
}

import { macroCondition, getOwnConfig } from '@embroider/macros';

export default function arg(target, key, descriptor) {
  let defaultValue = descriptor.initializer ? descriptor.initializer() : undefined;

  return {
    get() {
      if (macroCondition(getOwnConfig().useDefaultValueIfUndefined)) {
        const argValue = this.args[key];
        return argValue !== undefined ? argValue : defaultValue;
      } else {
        return Object.keys(this.args).includes(key) ? this.args[key] : defaultValue;
      }
    },
  };
}

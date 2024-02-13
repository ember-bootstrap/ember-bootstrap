import type Component from '@glimmer/component';

type DecoratorPropertyDescriptor = PropertyDescriptor & {
  initializer?: () => void;
};

/**
 * @internal
 */
function arg(target: object, key: string): void;
function arg(
  target: object,
  key: string,
  descriptor: DecoratorPropertyDescriptor,
): PropertyDescriptor;
function arg<S>(
  target: object,
  key: string,
  descriptor?: DecoratorPropertyDescriptor,
): PropertyDescriptor {
  return {
    get(this: Component<S>) {
      const argValue = this.args[key as keyof typeof this.args];
      return argValue !== undefined
        ? argValue
        : descriptor!.initializer
        ? descriptor!.initializer.call(this)
        : undefined;
    },
  };
}

export default arg;

type DecoratorPropertyDescriptor = PropertyDescriptor & {
    initializer?: () => void;
};
/**
 * @internal
 */
declare function arg(target: object, key: string): void;
declare function arg(target: object, key: string, descriptor: DecoratorPropertyDescriptor): PropertyDescriptor;
export default arg;
//# sourceMappingURL=arg.d.ts.map
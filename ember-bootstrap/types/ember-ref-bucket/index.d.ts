declare module 'ember-ref-bucket' {
  export function trackedRef(
    name: string,
  ): (target: object, key: string) => void;
  export function ref(name: string): (target: object, key: string) => void;
}

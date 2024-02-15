declare module 'ember-ref-bucket' {
  export function ref(name: string): (target: object, key: string) => void;
}

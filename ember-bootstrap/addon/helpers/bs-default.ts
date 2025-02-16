import { helper } from '@ember/component/helper';

export function bsDefault<T, U>(
  params: [T, U],
): T extends NonNullable<unknown> ? T : U {
  return (params[0] ?? params[1]) as T extends NonNullable<unknown> ? T : U;
}

export default helper(bsDefault);

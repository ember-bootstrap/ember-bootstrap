export default function bsDefault<T, U>(
  primary: T,
  secondary: U,
): T extends NonNullable<unknown> ? T : U {
  return (primary ?? secondary) as T extends NonNullable<unknown> ? T : U;
}

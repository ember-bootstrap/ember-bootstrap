export default function bsDefault<T, U>(primary: T, fallback: U): T extends NonNullable<unknown> ? T : U {
  return (primary ?? fallback) as T extends NonNullable<unknown> ? T : U;
}

export default function (
  prefix: string,
  type: string | undefined | null,
  options: { default?: string; outline?: boolean },
) {
  type = type ?? options.defaultValue;
  if (options.outline) {
    return `${prefix}-outline-${type}`;
  }
  return `${prefix}-${type}`;
}

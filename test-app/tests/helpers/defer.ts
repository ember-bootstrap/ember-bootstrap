export function defer() {
  let maybeResolve: (value: unknown) => void;
  let maybeReject: (reason: unknown) => void;

  const promise = new Promise((resolvePromise, rejectPromise) => {
    maybeResolve = resolvePromise;
    maybeReject = rejectPromise;
  });

  const resolve = (value?: unknown) => maybeResolve?.(value);
  const reject = (value?: unknown) => maybeReject?.(value);

  return { promise, resolve, reject };
}

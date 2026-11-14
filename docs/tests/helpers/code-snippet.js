import { find } from '@ember/test-helpers';

/**
 * Returns the source code shown for the code snippet with the given name,
 * e.g. `collapse-demo.gjs`.
 */
export function codeSnippetText(name) {
  let element = find(`[data-test-code-snippet="${name}"]`);
  if (!element) {
    throw new Error(`No code snippet named "${name}" rendered.`);
  }
  return element.textContent;
}

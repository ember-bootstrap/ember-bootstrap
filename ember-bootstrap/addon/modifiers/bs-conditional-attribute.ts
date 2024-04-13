import { modifier } from 'ember-modifier';

interface Signature {
  Args: {
    Positional: [attribute: string, condition: boolean, value: string];
  };
  Element: HTMLElement;
}

export default modifier<Signature>(
  (
    element: HTMLElement,
    [attribute, condition, value]: Signature['Args']['Positional'],
  ) => {
    if (condition) {
      element.setAttribute(attribute, value);
    } else {
      element.removeAttribute(attribute);
    }
  },
);

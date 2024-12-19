import { modifier } from 'ember-modifier';

interface Signature {
  Args: {
    Positional: [
      attribute: string,
      condition: boolean | undefined,
      value: unknown,
    ];
  };
  Element: Element;
}

export default modifier<Signature>(
  (
    element: Signature['Element'],
    [attribute, condition, value]: Signature['Args']['Positional'],
  ) => {
    if (condition) {
      element.setAttribute(attribute, `${value}`);
    } else {
      element.removeAttribute(attribute);
    }
  },
);

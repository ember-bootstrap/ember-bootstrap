import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export default helper(function ([source], { language, dynamic, quote = '"' }) {
  if (!dynamic) {
    return source;
  }
  Object.keys(dynamic).forEach((property) => {
    let propertyValue = get(dynamic, property);
    let hasValue = propertyValue !== undefined && propertyValue !== null;
    let type = typeof propertyValue;

    let quotedValue =
      type === 'string' ? `${quote}${propertyValue}${quote}` : propertyValue;

    switch (language) {
      case 'handlebars':
      case 'htmlbars':
        source = source.replace(
          new RegExp(
            `(<\\w*[^>]*\\s)(@[^=]+)={{(?:this\\.)?${property}}}([^>]*>)`,
            'g',
          ),
          hasValue
            ? type === 'string'
              ? `$1$2=${quotedValue}$3`
              : `$1$2={{${propertyValue}}}$3`
            : '$1$3',
        );
        source = source.replace(
          new RegExp(`{{${property}}}`, 'g'),
          propertyValue,
        );
        source = source.replace(
          new RegExp(`=${property}`, 'g'),
          `=${quotedValue}`,
        );
        break;
      default:
        source = source.replace(
          new RegExp(`{{${property}}}`, 'g'),
          quotedValue,
        );
    }
  });

  return source.replace(/\n\s*\n/g, '\n');
});

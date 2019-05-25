import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export default helper(function([source], { language, dynamic, quote = '"'}) {
  if (!dynamic) {
    return source;
  }
  Object.keys(dynamic).forEach((property) => {
    let propertyValue = get(dynamic, property);
    let type = typeof propertyValue;

    let quotedValue = type === 'string' ? `${quote}${propertyValue}${quote}` : propertyValue;

    switch (language) {
      case 'handlebars':
      case 'htmlbars':
        source = source.replace(
          new RegExp(`(<\\w*[^>]*\\s@[^=]+=){{${property}}}([^>]*>)`, 'g'),
          type === 'string' ? `$1${quotedValue}$2` : `$1{{${propertyValue}}}$2`
        );
        source = source.replace(new RegExp(`{{${property}}}`, 'g'), propertyValue);
        source = source.replace(new RegExp(`=${property}`, 'g'), `=${quotedValue}`);
        break;
      default:
        source = source.replace(new RegExp(`{{${property}}}`, 'g'), quotedValue);
    }
  });

  return source;
});

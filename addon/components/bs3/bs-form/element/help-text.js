import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import FormElementHelpText from 'ember-bootstrap/components/base/bs-form/element/help-text';

@classic
@classNames('help-block')
export default class HelpText extends FormElementHelpText {}

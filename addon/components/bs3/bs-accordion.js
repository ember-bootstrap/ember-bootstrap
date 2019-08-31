import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Accordion from 'ember-bootstrap/components/base/bs-accordion';

@classic
@classNames('panel-group')
export default class BsAccordion extends Accordion {}

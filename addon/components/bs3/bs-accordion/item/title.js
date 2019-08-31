import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import AccordionItemTitle from 'ember-bootstrap/components/base/bs-accordion/item/title';

@classic
@classNames('panel-heading')
export default class Title extends AccordionItemTitle {}

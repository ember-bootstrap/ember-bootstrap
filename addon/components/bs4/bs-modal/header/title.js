import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Title from 'ember-bootstrap/components/base/bs-modal/header/title';

@classic
@tagName('h5')
export default class _Title extends Title {}


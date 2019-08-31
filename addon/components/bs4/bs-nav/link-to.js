import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import NavLinkTo from 'ember-bootstrap/components/base/bs-nav/link-to';

@classic
@classNames('nav-link')
export default class LinkTo extends NavLinkTo {}

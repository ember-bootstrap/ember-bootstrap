import { getOwner } from '@ember/application';
import type FastBootService from 'ember-cli-fastboot/services/fastboot';

export default function isFastBoot(context: object) {
  const owner = getOwner(context);
  if (!owner) {
    return false;
  }
  const fastbootService = owner.lookup('service:fastboot') as
    | FastBootService
    | undefined
    | null;
  return fastbootService ? fastbootService.isFastBoot : false;
}

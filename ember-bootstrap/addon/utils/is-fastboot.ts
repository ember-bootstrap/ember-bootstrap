import { getOwner } from '@ember/owner';

export default function isFastBoot(context: object) {
  const owner = getOwner(context);
  const fastbootService = owner?.lookup('service:fastboot') as
    | { isFastBoot: boolean }
    | undefined;
  return fastbootService ? fastbootService.isFastBoot : false;
}

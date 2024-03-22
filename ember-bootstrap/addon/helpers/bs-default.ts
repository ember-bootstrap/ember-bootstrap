export default function bsDefaultHelper<PRIMARY, SECONDARY>(
  ...[primary, secondary]: [PRIMARY | undefined, SECONDARY]
): PRIMARY | SECONDARY {
  return primary ?? secondary;
}

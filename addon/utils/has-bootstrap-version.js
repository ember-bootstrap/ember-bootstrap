// eslint-disable-next-line no-undef
const hasVersion = BOOTSTRAP_VERSION; // will be replaced at build time

export default function hasBootstrapVersion(requiredVersion) {
  return requiredVersion === hasVersion;
}

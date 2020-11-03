import AJV from 'ajv';

export default function Ajv(config = null) {
  if (config) {
    return new AJV(config);
  }
  return new AJV();
}

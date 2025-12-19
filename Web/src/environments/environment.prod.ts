import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://riding-drag-terrorists-sensors.trycloudflare.com/api'
};

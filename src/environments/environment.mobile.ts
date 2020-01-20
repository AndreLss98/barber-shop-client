export const SERVER_URL = 'http://192.168.0.20';

export const environment = {
  production: true,
  socketIoConfig: {
    url: `${SERVER_URL}:8081`,
    options: {}
  }
};

export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
export const BASE_URL = `${SERVER_URL}:8080/api`;

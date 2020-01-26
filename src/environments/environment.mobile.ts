export const SERVER_URL = 'http://192.168.0.20';

export const environment = {
  production: false,
  socketIoConfig: {
    url: `${SERVER_URL}:8081`,
    options: {}
  }
};

export const BASE_URL = `${SERVER_URL}:8080`
export const BASE_URL_GRAPHQL = `${BASE_URL}/api`;
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';

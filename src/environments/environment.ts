// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_base_url: 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/',
  api_sl_url : 'http://hpb.health.gov.lk/api/',
  api_rapid_url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/',
  rapid_host: 'coronavirus-monitor.p.rapidapi.com',
  rapid_key: '6fff67c13cmsh9f1a8ac642f9900p1beca8jsn9ff55203ed26'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

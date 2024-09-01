// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  MAIN_URL:"http://localhost:8100",
  Server_URL:'http://localhost:3000/',
  LOGIN_REDIRECT:'http://localhost:8100/home',
  firebaseConfig : {
    apiKey: "AIzaSyDJGfrQGJeQyLR-CP7iwLweqv4PmEyBgTc",
    authDomain: "helpgenie-15944.firebaseapp.com",
    projectId: "helpgenie-15944",
    storageBucket: "helpgenie-15944.appspot.com",
    messagingSenderId: "437281664939",
    appId: "1:437281664939:web:889b6402360c00082e6cee",
    measurementId: "G-MKNKYCDMG3"
  },
  ONESIGNAL_APP_ID:"139af684-e9c9-4018-9fd3-4e6cbc7af8ad",
  GMAP_API_KEY:"AIzaSyCRn1s6OnCG3P_fBK2-ofohuiLXRYOWxAw",
  help_mail:'helpgenieservice@gmail.com',
  necktar_mail:'necktar.life@gmail.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

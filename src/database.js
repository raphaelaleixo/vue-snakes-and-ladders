var firebase = require('firebase/app');
require('firebase/database');
const config = {
  apiKey: 'AIzaSyCBVBsMdnvhfwGGvqQMraWCFyyTDT6O32A',
  authDomain: 'upsanddowns-3994e.firebaseapp.com',
  databaseURL: 'https://upsanddowns-3994e.firebaseio.com',
  projectId: 'upsanddowns-3994e',
  storageBucket: 'upsanddowns-3994e.appspot.com',
  messagingSenderId: '698130993831',
  appId: '1:698130993831:web:bbc553b45d76d34f',
};
firebase.initializeApp(config);

export default firebase.database();

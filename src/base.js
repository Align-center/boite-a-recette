import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDErHVewHT-zU0NGQHePKHcjux0cvC-HTk",
    authDomain: "recettes-91ae9.firebaseapp.com",
    databaseURL: "https://recettes-91ae9-default-rtdb.europe-west1.firebasedatabase.app/"
});

var database = firebase.database();

export { firebaseApp };

export default database;
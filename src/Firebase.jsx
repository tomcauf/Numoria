import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import FirabaseConfig from './config/firebase-config.jsx';

export let App;
export let Auth
export let Storage;
export let FireStore;
export let Database;

try {
    App = initializeApp(FirabaseConfig);
    Auth = getAuth(App);
    Storage = getStorage(App);
    FireStore = getFirestore(App);
    Database = getDatabase();
} catch (error) {
    App = undefined;
    Auth = undefined;
    Storage = undefined;
    FireStore = undefined;
    Database = undefined;
    if (process.env.NODE_ENV === "development") {
        alert("Authentification failed to initialize: ", error);
    }
}
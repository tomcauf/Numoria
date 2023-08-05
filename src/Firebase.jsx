import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import FirabaseConfig from './config/firebase-config.jsx';

export let App;
export let Auth;

try {
    App = initializeApp(FirabaseConfig);
    Auth = getAuth(App);
} catch (error) {
    App = undefined;
    Auth = undefined;
    if (process.env.NODE_ENV === "development") {
        alert("Authentification failed to initialize: ", error);
    }
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_qXpvywPcOvuql-479RagopcEgYbs2dU",
    authDomain: "matrimony-poc-demo-ganap.firebaseapp.com",
    projectId: "matrimony-poc-demo-ganap",
    storageBucket: "matrimony-poc-demo-ganap.firebasestorage.app",
    messagingSenderId: "456405786419",
    appId: "1:456405786419:web:07a15aa774689cf7bf6846"
};

import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

import firestoreService from "firestore-export-import";
import serviceAccountKey from "./serviceAccountKey";

const databaseURL = "https://cds-402ef.firebaseio.com";

firestoreService.initializeApp(serviceAccountKey, databaseURL);

firestoreService.restore("data.json");

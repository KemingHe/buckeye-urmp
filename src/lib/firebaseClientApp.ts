// ./src/lib/firebaseClientApp.ts
//
// Client-side Firebase app, auth, and Firestore setup.
"use client";

// Firebase (client) SDK essential imports.
import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";
import { type Functions, getFunctions } from "firebase/functions";

// // Firebase (client) local emulator setup imports.
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator } from "firebase/functions";

// Local utils imports.
import firebaseConfig from "@lib/firebaseConfig";

// -----------------------------------------------------------------------------
// Firebase client app instance.
// biome-ignore format: added alignment for clarity.
export interface FirebaseClientAppInstance {
  fbApp  : FirebaseApp;
  fbAuth : Auth;
  fbStore: Firestore;
  fbFunc : Functions;
}

// -----------------------------------------------------------------------------
export function firebaseClientApp(): FirebaseClientAppInstance {

  // If Firebase app is already initialized, use it,
  // else initialize the app using the Firebase config.
  let fbApp: FirebaseApp;
  const fbAppList: FirebaseApp[] | undefined = getApps();

  // Check for list defined, list not empty, and list item defined.
  if (fbAppList && fbAppList.length > 0 && fbAppList[0]) {
    fbApp = fbAppList[0];
  } else {
    fbApp = initializeApp(firebaseConfig);
  }

  // Get the Firebase services
  const fbAuth: Auth = getAuth(fbApp);
  const fbStore: Firestore = getFirestore(fbApp);
  const fbFunc: Functions = getFunctions(fbApp);

  // Connect to and seed emulators if in a local development environment.
  if (window.location.hostname === "localhost") {
    connectAuthEmulator(fbAuth, "http://localhost:9099");
    connectFirestoreEmulator(fbStore, "localhost", 8080);
    connectFunctionsEmulator(fbFunc, "localhost", 5001);
  }

  return { fbApp, fbAuth, fbStore, fbFunc };
}

// Export Firebase client objects for use in other modules.
export const { fbApp, fbAuth, fbStore, fbFunc }: FirebaseClientAppInstance = 
  firebaseClientApp();

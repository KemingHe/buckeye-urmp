// ./scripts/firebase-admin/firebaseAdminApp.ts
//
// Initialize and return (export) Firebase Admin app objects
// such as Auth, Firestore, and Storage.

// Firebase Admin SDK imports.
import {
  applicationDefault,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// -----------------------------------------------------------------------------
// Firebase Admin app instance.
// biome-ignore format: added alignment for clarity.
export interface FirebaseAdminAppInstance {
  fbAdminApp  : App;
  fbAdminAuth : Auth;
  fbAdminStore: Firestore;
}

// -----------------------------------------------------------------------------
// Modular Firebase Admin app initialization.
export function firebaseAdminApp(): FirebaseAdminAppInstance {

  // If Firebase Admin app is already initialized, use it,
  // else initialize the app using the default credentials.
  let fbAdminApp: App;
  const fbAdminAppList: App[] | undefined = getApps();

  // Check for list defined, list not empty, and list item defined.
  if (fbAdminAppList && fbAdminAppList.length > 0 && fbAdminAppList[0]) {
    fbAdminApp = fbAdminAppList[0];
  } else {
    fbAdminApp = initializeApp({
      credential: applicationDefault(),
    });
  }

  // Get the Firebase Admin services
  const fbAdminAuth: Auth = getAuth(fbAdminApp);
  const fbAdminStore: Firestore = getFirestore(fbAdminApp);

  return { fbAdminApp, fbAdminAuth, fbAdminStore };
}

// Export Firebase Admin objects for use in other modules.
export const { fbAdminApp, fbAdminAuth, fbAdminStore } = firebaseAdminApp();

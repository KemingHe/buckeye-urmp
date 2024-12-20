// ./src/firebase/firebaseConfig.ts
//
// Client and server app shared Firebase configuration.

// IMPORTANT!!
// Client (browser) does not support server (Node.js) libraries
// such as "fs". Do NOT use "dotenv-safe" to import environment variables.

// TODO: add error handling for missing environment variables.

const firebaseConfig = 
// biome-ignore format: added alignment for clarity.
{
  apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export default firebaseConfig;

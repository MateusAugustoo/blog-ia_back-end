import admin from 'firebase-admin';
import { env } from './env';

const serviceAccount = env.FIREBASE_CREDENTIALS

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  console.log("Firebase initialized")
}

const auth = admin.auth();

export { auth }
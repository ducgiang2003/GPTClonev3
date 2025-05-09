import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../our-truth-458901-c3-firebase-adminsdk-fbsvc-ee53e0d13d.json' with { type: 'json' };

const app = initializeApp({
    credential: cert(serviceAccount)
  });
  
  // Lấy Firestore instance
const db = getFirestore(app);
  
export default db;

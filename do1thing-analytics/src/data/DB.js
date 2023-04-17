import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from './Secret';
import { collection, query, where, getCountFromServer, getFirestore } from 'firebase/firestore';

let firebaseApp = null;
let userCollection = 'users'

const getFBApp = () => {
    if (!firebaseApp) {
      if (getApps() == 0) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApps()[0];
      }
    }
    return firebaseApp;
  }
  
  const getDB = () => {
    return getFirestore(getFBApp());
  }

  const getUserCount = async () => {
    const usersColl = collection(getDB(), userCollection);
    const q = query(usersColl);
    const snapshot = await getCountFromServer(q);
    console.log('count: ', snapshot.data().count);
  }

export {getUserCount};
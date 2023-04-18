import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from './Secret';
import { collection, query, where, getCountFromServer, getFirestore, getDocs } from 'firebase/firestore';

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
    const q = query(usersColl, where("badges", "array-contains", 1));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  const getSignedUpUsers = async () => {
    const usersColl = collection(getDB(), userCollection);
    const q = query(usersColl, where("badges", "array-contains", 1));
    const snapshot = await getDocs(q);

    let usersObj = [];
    snapshot.forEach((doc) => {
      usersObj = [...usersObj, {email: doc.data().email, badges: String(doc.data().badges)}];
    })

    console.log('signedup: ', usersObj);

    return usersObj;
  }

export {getUserCount,
        getSignedUpUsers,
};
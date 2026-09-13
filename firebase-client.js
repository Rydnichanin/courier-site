import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerUser({name, phone, password, role='client'}) {
  const email = phone.replace(/\D/g,'') + '@todace.local';
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, {displayName:name});
  await setDoc(doc(db,'users',credential.user.uid), {
    uid: credential.user.uid, name, phone, role, active:true,
    createdAt: serverTimestamp()
  });
  return credential.user;
}

export async function loginUser({phone, password}) {
  const email = phone.replace(/\D/g,'') + '@todace.local';
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export function logoutUser(){ return signOut(auth); }

export async function getUserProfile(uid){
  const snap = await getDoc(doc(db,'users',uid));
  return snap.exists() ? snap.data() : null;
}

export async function createFirestoreOrder(order){
  const ref = await addDoc(collection(db,'orders'), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return ref.id;
}

export function subscribeToOrders(callback){
  const q = query(collection(db,'orders'), orderBy('createdAt','desc'));
  return onSnapshot(q, snap => callback(snap.docs.map(d => ({id:d.id,...d.data()}))));
}

export function watchAuth(callback){ return onAuthStateChanged(auth, callback); }

window.CourierFirebase = {auth, db, registerUser, loginUser, logoutUser, getUserProfile, createFirestoreOrder, subscribeToOrders, watchAuth};

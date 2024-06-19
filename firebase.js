import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC56OIQ5Xlkmzj_nOz80YKlpsR0Enf1V5I",
  authDomain: "db-real-ed20a.firebaseapp.com",
  projectId: "db-real-ed20a",
  storageBucket: "db-real-ed20a.appspot.com",
  messagingSenderId: "861838157440",
  appId: "1:861838157440:web:29de0ad307170ddecc6865"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = async  (atleta) => {
  try {
    const res = await addDoc(collection(db, "Atletas"), atleta);
    if (res) {
      Swal.fire('Guardado','','success')
    }
  } catch (error) {
    console.log(error);
  }
};

export const getData = (data) => {
  onSnapshot(collection(db, "Atletas"), data);
};

export const remove = (id) => {
  deleteDoc(doc(db, "Atletas", id));
};

export const getDocumento = (id) => getDoc(doc(db, "Atletas", id));

export const update = (id, atleta) => {
  console.log(id);
  console.log(atleta);
  updateDoc(doc(db, "Atletas", id), atleta);
};

export const userValid = async (run) => {
  const q = query(collection(db, "Atletas"), where("run", "==", run));
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length >= 1) {
    return false
  } else {
    return true
  }
}
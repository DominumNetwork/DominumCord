
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js"

let app,auth,db,storage

export function initFirebase(){

const firebaseConfig={
apiKey: "AIzaSyA8OeMVqBKekHWRxwqdjoNaG25sddge_go",
  authDomain: "dominumcord.firebaseapp.com",
  projectId: "dominumcord",
  storageBucket: "dominumcord.firebasestorage.app",
  messagingSenderId: "994206600698",
  appId: "1:994206600698:web:9d78490e55062a25cb2843",
  measurementId: "G-47WFJ3D3SZ"
}

app=initializeApp(firebaseConfig)
auth=getAuth(app)
db=getFirestore(app)
storage=getStorage(app)

}

export {auth,db,storage}

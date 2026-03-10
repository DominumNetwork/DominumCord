import { auth, db } from "../core/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function initAuth() {
    console.log("Auth system initializing...");

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in:", user.email);
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                updateUserPanel(userData.username, "online");
                
                await updateDoc(doc(db, "users", user.uid), { status: "online" });
            }
        } else {
            console.log("User is logged out.");
            showLoginScreen();
        }
    });
}

function updateUserPanel(username, status) {
    const usernameElement = document.querySelector(".user-panel .username");
    const statusIndicator = document.querySelector(".status-indicator");
    
    if (usernameElement) usernameElement.innerText = username;
    if (statusIndicator) {
        statusIndicator.className = "status-indicator";
        statusIndicator.classList.add(status);
    }
}

function showLoginScreen() {
    console.log("Triggering login UI...");
}

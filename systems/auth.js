import { auth, db } from "../core/firebase.js";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initAuth() {
    console.log("Auth system initializing...");

    const loginOverlay = document.getElementById("loginOverlay");
    const emailLoginBtn = document.getElementById("emailLoginBtn");
    const googleLoginBtn = document.getElementById("googleLoginBtn");

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in:", user.email);
            loginOverlay.classList.add("hidden");

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                updateUserPanel(userData.displayName || userData.username, "online", userData.photoURL);
                await updateDoc(userRef, { status: "online", lastSeen: new Date() });
            } else {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || "New User",
                    photoURL: user.photoURL || "./assets/default_avatar.png", 
                    status: "online",
                    lastSeen: new Date()
                });
                updateUserPanel(user.displayName || "New User", "online", user.photoURL);
            }
        } else {
            console.log("User is logged out.");
            loginOverlay.classList.remove("hidden");
        }
    });
    
    emailLoginBtn.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        
        if (!email || !password) return alert("Please enter both email and password!");

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message);
        }
    });

    const googleProvider = new GoogleAuthProvider();
    googleLoginBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Login failed:", error);
        }
    });
}

// Helper to update the bottom-left profile bar
function updateUserPanel(username, status, photoURL) {
    const usernameElement = document.querySelector(".user-panel .username");
    const statusIndicator = document.querySelector(".status-indicator");
    const avatar = document.querySelector(".user-panel .avatar");
    
    if (usernameElement) usernameElement.innerText = username;
    if (avatar && photoURL) {
        avatar.style.backgroundImage = `url('${photoURL}')`;
        avatar.style.backgroundSize = "cover";
    }
    if (statusIndicator) {
        statusIndicator.className = "status-indicator"; 
        statusIndicator.classList.add(status); 
    }
}

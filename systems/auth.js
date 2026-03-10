import { auth, db } from "../core/firebase.js";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initAuth() {
    console.log("Auth system initializing...");

    const loginOverlay = document.getElementById("loginOverlay");
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");
    
    document.getElementById("showRegisterBtn").addEventListener("click", () => {
        loginBox.classList.add("hidden-box");
        registerBox.classList.remove("hidden-box");
    });
    
    document.getElementById("showLoginBtn").addEventListener("click", () => {
        registerBox.classList.add("hidden-box");
        loginBox.classList.remove("hidden-box");
    });

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

    document.getElementById("emailLoginBtn").addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        if (!email || !password) return alert("Please enter both email and password!");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    });

    document.getElementById("emailRegBtn").addEventListener("click", async () => {
        const username = document.getElementById("regUsername").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        
        if (!username || !email || !password) return alert("Please fill out all fields!");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: username,
                photoURL: "./assets/default_avatar.png",
                status: "online",
                lastSeen: new Date()
            });
            
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    });

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleAuth = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Auth failed:", error);
            alert("Google login failed. Are you running on a local server?");
        }
    };

    document.getElementById("googleAuthBtn1").addEventListener("click", handleGoogleAuth);
    document.getElementById("googleAuthBtn2").addEventListener("click", handleGoogleAuth);
}

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
        statusIndicator.className = "status-indicator " + status; 
    }
}

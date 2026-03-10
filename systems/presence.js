import { db } from "../core/firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initPresence() {
    console.log("Presence system initialized");
    
    const userRef = doc(db, "users", "dominum_user_1");

    window.addEventListener('load', async () => {
        try {
            await updateDoc(userRef, { status: "online" });
        } catch (error) {
            console.log("No user database setup yet for presence.");
        }
    });

    window.addEventListener('beforeunload', () => {
        updateDoc(userRef, { status: "offline" });
    });
}

import { db, auth } from "../core/firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initActivities() {
    console.log("Activities system initialized");
}

export async function setCustomStatus(statusText) {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, {
            customStatus: statusText
        });
        console.log("Status updated to:", statusText);
    } catch (error) {
        console.error("Failed to update status:", error);
    }
}

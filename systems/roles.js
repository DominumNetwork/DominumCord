import { db, auth } from "../core/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initRoles() {
    console.log("Roles system initialized");
}

export async function checkUserRole(userId, serverId) {
    try {
        const memberRef = doc(db, "servers", serverId, "members", userId);
        const memberDoc = await getDoc(memberRef);
        
        if (memberDoc.exists()) {
            return memberDoc.data().role || "member";
        }
        return "member";
    } catch (error) {
        console.error("Error fetching roles:", error);
        return "member";
    }
}

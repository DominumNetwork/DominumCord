import { db, auth } from "../core/firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initAuditlog() {
    console.log("Audit Log system initialized");
}

export async function logAction(serverId, actionType, targetId, reason = "No reason provided") {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const auditRef = collection(db, "servers", serverId, "audit_logs");
        await addDoc(auditRef, {
            action: actionType, // e.g., "MESSAGE_DELETE", "USER_KICK"
            actorId: user.uid,
            actorName: user.displayName,
            targetId: targetId,
            reason: reason,
            timestamp: serverTimestamp()
        });
        console.log(`Audit Logged: ${actionType} by ${user.displayName}`);
    } catch (error) {
        console.error("Failed to write to audit log:", error);
    }
}

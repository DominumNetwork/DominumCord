import { db, auth } from "../core/firebase.js";
import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initDms() {
    console.log("DMs system initialized");
    
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadDirectMessages(user.uid);
        }
    });
}

function loadDirectMessages(currentUserId) {
    const dmList = document.getElementById("dmList");
    
    const dmsRef = collection(db, "dms");
    const q = query(dmsRef, where("participants", "array-contains", currentUserId));

    onSnapshot(q, (snapshot) => {
        dmList.innerHTML = `<div class="category-header">DIRECT MESSAGES</div>`;
        
        snapshot.forEach((doc) => {
            const dm = doc.data();
            const dmHTML = `
                <div class="channel-item" data-id="${doc.id}">
                    <div class="avatar" style="width: 24px; height: 24px; border-radius: 50%; background: #5865F2; margin-right: 8px;"></div>
                    ${dm.name || "Unnamed Chat"}
                </div>
            `;
            dmList.insertAdjacentHTML('beforeend', dmHTML);
        });
    });
}

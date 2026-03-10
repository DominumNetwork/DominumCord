import { db } from "../core/firebase.js";
import { collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initFriends() {
    console.log("Friends system initialized");
    loadMemberList();
}

function loadMemberList() {
    const memberList = document.getElementById("memberList");
    
    const q = query(collection(db, "users"), where("status", "==", "online"));

    onSnapshot(q, (snapshot) => {
        memberList.innerHTML = `<div class="member-category">ONLINE — ${snapshot.size}</div>`;
        
        snapshot.forEach((doc) => {
            const user = doc.data();
            const username = user.displayName || user.username || "Unknown";
            const avatarUrl = user.photoURL || "./assets/default_avatar.png";

            const memberHTML = `
                <div class="member-item">
                    <div class="avatar" style="background-image: url('${avatarUrl}'); background-size: cover;">
                        <div class="status-indicator online"></div>
                    </div>
                    <div class="member-name">${username}</div>
                </div>
            `;
            memberList.insertAdjacentHTML('beforeend', memberHTML);
        });
    });
}

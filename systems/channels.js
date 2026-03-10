import { db } from "../core/firebase.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function initChannels() {
    console.log("Channels system initialized");
}

export function loadServerChannels(serverId) {
    const channelList = document.getElementById("channelList");
    
    const q = query(collection(db, "channels"), where("serverId", "==", serverId));

    onSnapshot(q, (snapshot) => {
        channelList.innerHTML = `<div class="category-header">TEXT CHANNELS</div>`;
        
        snapshot.forEach((doc) => {
            const channel = doc.data();
            const channelHTML = `
                <div class="channel-item" data-id="${doc.id}">
                    <span class="hash">#</span> ${channel.name}
                </div>
            `;
            channelList.insertAdjacentHTML('beforeend', channelHTML);
        });
        
        document.querySelectorAll('.channel-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.channel-item').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const channelId = e.currentTarget.getAttribute('data-id');
                console.log("Switched to channel:", channelId);
            });
        });
    });
}

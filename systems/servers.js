import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export function initServers() {
    console.log("Servers initializing...");
    
    const db = getFirestore(); 
    const serverList = document.getElementById("serverList");

    onSnapshot(collection(db, "servers"), (snapshot) => {
        serverList.innerHTML = `
            <div class="server-item discord-logo">
                <div class="pill active"></div>
                <div class="icon-wrapper">D</div>
            </div>
            <div class="server-separator"></div>
        `;

        snapshot.forEach((doc) => {
            const server = doc.data();
            const serverInitials = server.name ? server.name.substring(0, 2).toUpperCase() : "SV";

            const serverHTML = `
                <div class="server-item" data-id="${doc.id}">
                    <div class="pill"></div>
                    <div class="icon-wrapper">${serverInitials}</div>
                </div>
            `;
            serverList.insertAdjacentHTML('beforeend', serverHTML);
        });

        serverList.insertAdjacentHTML('beforeend', `
            <div class="server-item add-server">
                <div class="icon-wrapper">+</div>
            </div>
        `);
    });
}

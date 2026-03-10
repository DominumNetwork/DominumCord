import { db } from "../core/firebase.js";
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function initMessages() {
    console.log("Messages system initialized");

    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    
    const messagesRef = collection(db, "servers", "default_server", "channels", "general", "messages");
    
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    
    onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = ''; 
        
        snapshot.forEach((doc) => {
            renderMessage(doc.data(), messagesContainer);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    messageInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && messageInput.value.trim() !== '') {
            const text = messageInput.value.trim();
            messageInput.value = ''; 
            
            try {
                await addDoc(messagesRef, {
                    text: text,
                    authorName: "Dominus_Elitus",
                    authorId: "NwemXkwJJLTxeDjXQ6ywaTgaVHF2",
                    authorPhoto: "https://cdn.discordapp.com/embed/avatars/0.png",
                    createdAt: serverTimestamp()
                });
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    });
}

function renderMessage(data, container) {
    const username = data.authorName || "Unknown User";
    const text = data.text || "";
    const avatarUrl = data.authorPhoto || "https://cdn.discordapp.com/embed/avatars/0.png";
    
    let timeString = "Just now";
    if (data.createdAt) {
        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const messageHTML = `
        <div class="message-group">
            <div class="message-avatar" style="background-image: url('${avatarUrl}'); background-size: cover;"></div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${username}</span>
                    <span class="message-timestamp">${timeString}</span>
                </div>
                <div class="message-text">${text}</div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', messageHTML);
}

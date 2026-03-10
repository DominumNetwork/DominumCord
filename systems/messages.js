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
    
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    
    onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = '';
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            renderMessage(data, messagesContainer);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    messageInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && messageInput.value.trim() !== '') {
            const text = messageInput.value.trim();
            messageInput.value = '';
            
            try {
                await addDoc(collection(db, "messages"), {
                    text: text,
                    username: "Dominum", // Hardcoded for now until auth is linked
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    });
}

function renderMessage(data, container) {
    const username = data.username || "Unknown User";
    const text = data.text || "";
    
    let timeString = "Just now";
    if (data.timestamp) {
        const date = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const messageHTML = `
        <div class="message-group">
            <div class="message-avatar"></div>
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

import { db, auth } from "../core/firebase.js";

export function initSlashcommands() {
    console.log("Slash Commands system initialized");
    
    const messageInput = document.getElementById("messageInput");

    messageInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && messageInput.value.trim().startsWith("/")) {
            e.preventDefault();
            e.stopImmediatePropagation(); 
            
            const commandText = messageInput.value.trim().substring(1);
            messageInput.value = '';
            
            executeCommand(commandText);
        }
    });
}

function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0].toLowerCase();

    if (cmd === "shrug") {
        sendFakeMessage("¯\\_(ツ)_/¯");
    } else if (cmd === "clear") {
        document.getElementById("messages").innerHTML = "";
    } else {
        alert(`Unknown command: /${cmd}`);
    }
}

function sendFakeMessage(text) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.insertAdjacentHTML('beforeend', `
        <div class="message-group">
            <div class="message-avatar" style="background: #5865F2;"></div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username" style="color: #5865F2;">DominumBot</span>
                    <span class="message-timestamp">Just now</span>
                </div>
                <div class="message-text"><i>${text}</i></div>
            </div>
        </div>
    `);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

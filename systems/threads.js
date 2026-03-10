export function initThreads() {
    console.log("Threads system initialized");
    
    const messagesContainer = document.getElementById('messages');
    
    messagesContainer.addEventListener("click", (e) => {
        const messageText = e.target.closest(".message-text");
        
        if (messageText) 
            document.querySelectorAll('.message-group').forEach(m => m.style.backgroundColor = 'transparent');
            messageText.closest(".message-group").style.backgroundColor = "rgba(78, 80, 88, 0.3)";
            
            console.log("Thread requested for message!");
        }
    });
}

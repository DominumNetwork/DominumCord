export function initTyping() {
    console.log("Typing system initialized");
    
    const messageInput = document.getElementById("messageInput");
    const typingIndicator = document.getElementById("typing");
    let typingTimeout;

    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim().length > 0) {
            typingIndicator.innerText = "You are typing...";
            
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                typingIndicator.innerText = "";
            }, 2000);
            
        } else {
            typingIndicator.innerText = "";
        }
    });
}

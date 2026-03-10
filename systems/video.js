export function initVoice() {
    console.log("Voice system initialized");
    
    const joinVoiceBtn = document.getElementById("joinVoiceBtn");
    
    if (joinVoiceBtn) {
        joinVoiceBtn.addEventListener("click", async () => {
            try {
                console.log("Requesting microphone access...");
                const audioStream = await navigator.mediaDevices.getUserMedia({ 
                    audio: true, 
                    video: false 
                });
                
                console.log("Microphone connected!");
                
            } catch (error) {
                console.error("Microphone access denied or failed:", error);
                alert("Could not access your microphone. Check your browser permissions!");
            }
        });
    }
}

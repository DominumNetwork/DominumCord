export function initVideo() {
    console.log("Video system initialized");

    const enableCameraBtn = document.getElementById("enableCameraBtn");
    
    if (enableCameraBtn) {
        enableCameraBtn.addEventListener("click", async () => {
            try {
                console.log("Requesting camera access...");
                const videoStream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: true
                });
                
                console.log("Camera connected!");
                
                const localVideoElement = document.getElementById("localVideo");
                if (localVideoElement) {
                    localVideoElement.srcObject = videoStream;
                    localVideoElement.play();
                }
                
            } catch (error) {
                console.error("Camera access denied or failed:", error);
                alert("Could not access your camera. Check your browser permissions!");
            }
        });
    }
}

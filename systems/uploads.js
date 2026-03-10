import { storage } from "../core/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

export function initUploads() {
    console.log("Uploads system initialized");
    
    const uploadBtn = document.getElementById("uploadBtn");
    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg, image/gif";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            fileInput.click();
        });
    }

    fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("Preparing to upload:", file.name);
        alert(`Selected ${file.name} for upload! Storage logic ready.`);
        
        fileInput.value = ""; 
    });
}

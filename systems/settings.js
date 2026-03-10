export function initSettings() {
    console.log("Settings system initialized");
  
    const settingsBtn = document.querySelector(".user-controls");
    
    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
            console.log("Settings menu requested!");
            openSettingsModal();
        });
    }
}

function openSettingsModal() {
    alert("Settings Modal will open here!"); 
}

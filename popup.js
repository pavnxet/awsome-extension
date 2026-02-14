const toggle = document.getElementById('mainToggle');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const genBtn = document.getElementById('genBtn');
const copyBtn = document.getElementById('copyBtn');
const passOut = document.getElementById('passOut');

// Load saved settings
chrome.storage.local.get(['extensionEnabled'], (data) => {
    if (data.extensionEnabled !== undefined) {
        toggle.checked = data.extensionEnabled;
        updateUI(data.extensionEnabled);
    }
});

// Switch Logic
toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled });
    updateUI(isEnabled);
});

function updateUI(isEnabled) {
    if (isEnabled) {
        statusDot.classList.remove('off');
        statusText.innerHTML = 'Service: <strong>Active</strong>';
    } else {
        statusDot.classList.add('off');
        statusText.innerHTML = 'Service: <strong>Paused</strong>';
    }
}

// --- PASSWORD GENERATOR LOGIC ---
function generatePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 14; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    passOut.innerText = password;
}

genBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
    const text = passOut.innerText;
    if (text !== "Click Generate") {
        navigator.clipboard.writeText(text);
        copyBtn.innerText = "Copied!";
        setTimeout(() => { copyBtn.innerText = "Copy"; }, 1500);
    }
});

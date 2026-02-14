(function() {
    // Check if the extension is enabled before doing anything
    chrome.storage.local.get(['extensionEnabled'], (data) => {
        // If extensionEnabled is explicitly false, stop the script
        if (data.extensionEnabled === false) {
            console.log("Speeddrain Pro is currently PAUSED.");
            return;
        }

        const url = window.location.href;

        // --- FEATURE: SAVE TO HISTORY ---
        // If we are on a pixeldrain link, save it as the "Last Processed" link
        if (url.includes("pixeldrain.com/u/")) {
            chrome.storage.local.set({ lastProcessed: url });
        }

        // --- STEP 1: REDIRECT TO SPEEDDRAIN ---
        if (url.includes("pixeldrain") && !url.includes("pixeldrain.com/u/")) {
            const id = url.split('/u/')[1];
            if (id) {
                const cleanLink = "https://pixeldrain.com/u/" + id;
                chrome.storage.local.set({ savedLink: cleanLink }, () => {
                    window.location.href = "https://speeddrain.vercel.app/";
                });
            }
        }

        // --- STEP 2: AUTO-FILL ON SPEEDDRAIN PAGE ---
        if (url.includes("speeddrain.vercel.app")) {
            const checkInput = setInterval(() => {
                const input = document.querySelector('input[type="url"]');
                if (input) {
                    chrome.storage.local.get(['savedLink'], (res) => {
                        if (res.savedLink) {
                            clearInterval(checkInput);
                            input.value = res.savedLink;
                            // Trigger input event so the website sees the text
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                            chrome.storage.local.remove('savedLink');

                            // Wait a bit then click the unlock button
                            setTimeout(() => {
                                const btn = Array.from(document.querySelectorAll('button'))
                                    .find(b => b.innerText.includes("Speed Unlock"));
                                if (btn) btn.click();
                            }, 800);
                        }
                    });
                }
            }, 200);

            // --- STEP 3: FINAL DOWNLOAD STEP ---
            const checkDown = setInterval(() => {
                const link = document.querySelector('a[href*="pixeldrain.com/api/file/"]');
                if (link) {
                    clearInterval(checkDown);
                    // Convert back to .dev for the actual high-speed download
                    const finalUrl = link.href.replace("pixeldrain.com", "pixeldrain.dev");

                    setTimeout(() => {
                        // Tell background.js to open it cleanly (no referer)
                        chrome.runtime.sendMessage({ action: "open_clean", url: finalUrl });
                    }, 3000);
                }
            }, 500);
        }
    });
})();

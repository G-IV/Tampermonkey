// ==UserScript==
// @name         Auto Click Channel Points
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Auto-clicks channel point button
// @author       G-IV
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/**
 * Use MutationObserver to monitor for the appearance of the "Claim Bonus" button
 */

function monitorForClaimBonus() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('aria-label') === 'Claim Bonus') {
                        console.log('Claim Bonus button detected:', node);
                        // Perform any action you want here, e.g., auto-click the button
                        node.click();
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Call the function to start monitoring
if (window.top === window.self) {
    monitorForClaimBonus();
}
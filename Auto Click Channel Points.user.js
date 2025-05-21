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

function monitorSpecificElement(querySelector) {
    //'.Layout-sc-1xcs6mc-0.kxrhnx'
    const targetElement = document.querySelector(querySelector);
    console.log('Target element:', targetElement);
    if (!targetElement) {
        console.warn('Target element not found. Retrying...');
        setTimeout(monitorSpecificElement, 1000); // Retry after 1 second if the element is not found
        return;
    }
    else {
        console.log('Target element found:', targetElement);
        // Check if the button is already present
        const claimBonusButton = targetElement.querySelector('[aria-label="Claim Bonus"]');
        if (claimBonusButton) {
            console.log('Claim Bonus button already present:', claimBonusButton);
            claimBonusButton.click();
        } else {
            console.log('Claim Bonus button not found in the target element.');
        }
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const claimBonusButton = node.querySelector('[aria-label="Claim Bonus"]');
                        if (claimBonusButton) {
                            console.log('Claim Bonus button detected:', claimBonusButton);
                            claimBonusButton.click();
                        }
                    }
                });
            }
        }
    });

    observer.observe(targetElement, { childList: true, subtree: true });
    console.log('MutationObserver is set up to monitor the target element:', targetElement);
}

function searchForClaimBonusButton() {
    const intervalId = setInterval(() => {
        const claimBonusButton = document.querySelector('[aria-label="Claim Bonus"]');
        if (claimBonusButton) {
            console.log('Claim Bonus button found:', claimBonusButton);
            const parentElement = claimBonusButton.parentNode.parentNode.parentNode.parentNode;
            console.log('Claim Bonus button clicked:', parentElement);
            monitorSpecificElement(parentElement);
            clearInterval(intervalId); // Stop searching once the button is found and clicked
        } else {
            console.log('Claim Bonus button not found. Retrying in 5 seconds...');
        }
    }, 5000); // Retry every 5 seconds
}

// Call the function to start monitoring
if (window.top === window.self) {
    searchForClaimBonusButton()
}
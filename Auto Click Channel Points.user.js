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
 * Using a set interval of 5 seconds, poll the browser for the Claim Bonus button
 */

const handlePointsButton = () => {
    return setInterval(() => {
        const claimPointsBtn = document.querySelector('[aria-label="Claim Bonus"]');
        if (claimPointsBtn !== null) {
            claimPointsBtn.click()
            console.log('Points claimed!');
        }
    }, 5000)
}

if (window.top === window.self) {
    const pointButtonIntvl = handlePointsButton()
}
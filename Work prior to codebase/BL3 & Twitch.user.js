// ==UserScript==
// @name         BL3 & Twitch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *//*.ext-twitch.tv/*
// @exclude      *//supervisor.ext-twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-idle
// @grant        none
// @require      file:///Users/georgeburrows/Documents/Desktop/Projects/BL3 & Twitch/BL3 & Twitch.user.js
// ==/UserScript==

/*
 * https://stackoverflow.com/questions/37616818/apply-a-greasemonkey-tampermonkey-userscript-to-an-iframe
 * main page: https://www.twitch.tv/*
 * first iframe: https://supervisor.ext-twitch.tv/supervisor/v1/index.html
 * second iframe: 
 * https://07kczqwdkjxw6la4j92crc5wyumjxa.ext-twitch.tv/07kczqwdkjxw6la4j92crc5wyumjxa/4.2.3/330ca8305eaea1890c549a0199e4e857/video_overlay.html?anchor=video_overlay&language=en&locale=en-US&mode=viewer&state=released&platform=web
 * https://07kczqwdkjxw6la4j92crc5wyumjxa.ext-twitch.tv/07kczqwdkjxw6la4j92crc5wyumjxa/4.2.3/330ca8305eaea1890c549a0199e4e857/video_overlay.html?anchor=video_overlay&amp;language=en&amp;locale=en-US&amp;mode=viewer&amp;state=released&amp;platform=web
 * 
 * 
// @match        https://www.twitch.tv/*
// @match        *//*ext-twitch.tv/*
 * 
 * 
 */

/*
    const iframe = document.querySelector('iframe[allowfullscreen]');
  const doc = iframe && iframe.contentDocument;
  const video = doc && doc.querySelector('video[src]');
  if (!video) {
    setTimeout(poll, 100);
    return;
  }
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

const hasMenu = (window) => {
    const body = window.document.body;
    // const iframe = body.querySelector('iframe')
    console.log('Window:', window, '\nbody:', body, '\niframe:', body.querySelector('iframe'))
    if(!body.querySelector('iframe')) {
        setTimeout(() => {}, 1000);
        console.log('iframe doc', body.querySelector('iframe'));
    } 
    else {
        console.log('iframe doc', body.querySelector('iframe'));
        console.log('body does not have iframe');
    }
    // console.log(window.document.querySelector('body')?.querySelector('iframe'));
    // console.log('iframe has menu items?')
    // console.log(window.document.querySelector('body')?.querySelector('iframe')?.querySelector('.menu-items'))
    return !!window.document.querySelector('body')?.querySelector('iframe')?.querySelector('.menu-items')
}

console.log('script start...')

if (window.top === window.self) {
    console.log('setting up main page')
    const pointButtonIntvl = handlePointsButton()
}
else {
    console.log('userscript is in the iframe page')
    // console.log(window.document.body.querySelector('iframe'));
    // console.log(`iframe has menu-items? ${hasMenu(window) ? true : false}`)
    console.log('toast-spacer', window.document.body.querySelector('.toast-spacer'))
}

console.log('script end...')
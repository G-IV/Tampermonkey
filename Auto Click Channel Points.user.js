// ==UserScript==
// @name         BL3 & Twitch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @run-at       document-idle
// @grant        none
// @require      file:///Users/georgeburrows/Documents/Desktop/Projects/BL3 & Twitch/BL3 & Twitch.user.js
// ==/UserScript==

const bl3Iframe = {
    node: undefined,
    src: 'https://07kczqwdkjxw6la4j92crc5wyumjxa.ext-twitch.tv/07kczqwdkjxw6la4j92crc5wyumjxa/4.2.3/330ca8305eaea1890c549a0199e4e857/video_overlay.html?anchor=video_overlay&language=en&locale=en-US&mode=viewer&state=released&platform=web',
    origin: 'https://07kczqwdkjxw6la4j92crc5wyumjxa.ext-twitch.tv',
    isLoaded: false,
    isBroadcasting: false,
    testBroadcast: false,
    parentWindow: undefined
}

const eventData = {
    isTrusted: true,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {},
    data: {type: 'click', clientX: 46, clientY: 75, elementTag: 'DIV', elementClass: 'tooltip-hover'},
    defaultPrevented: false,
    eventPhase: 0,
    lastEventId: "",
    origin: "https://07kczqwdkjxw6la4j92crc5wyumjxa.ext-twitch.tv",
    ports: [],
    returnValue: true,
    source: {},
    srcElement: {},
    target: {},
    timeStamp: 777.6000000238419,
    type: "message",
    userActivation: null,
};

const focusIn = {
    action: "twitch-ext-user-action",
    payload: {type: 'focusin'},
}

const clickInto = {
    type: 'click',
    clientX: 534,
    clientY: 219,
    elementTag: 'DIV',
    elementClass: 'app dark production desktop small xs en viewer'
}

const clickThingy = {type: 'click', clientX: 46, clientY: 75, elementTag: 'DIV', elementClass: 'tooltip-hover'};

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

const redeemTheNoPrize = () => {
    // Click the points button
    pointsBalanceButton.click()
    setTimeout(() => {}, 500)
    // // Click the "No Prize" button
    document.querySelector('img[alt="The NO PRIZE"]').closest('button').click()
    // // Gather component details
    noPrize.button = document
        .querySelector('img[alt="The NO PRIZE"]')
        .closest('#channel-points-reward-center-body')
        .querySelector('button')
    const hasNotBeenRedeemedText = 'You can only redeem this reward during a stream.';
    const isDisabled = noPrize.button.hasAttribute('disabled')
    const textToCheck = noPrize
        .button
        .previousElementSibling
        .querySelector('p')
        .innerText
    noPrize.redeemed = textToCheck !== hasNotBeenRedeemedText
    console.log(textToCheck)
    // If the prize has not been redeemed yet
    if (!noPrize.redeemed) {
        console.log('if')
        // Repeatedly check to see if the button is enabled
        noPrize.interval = setInterval(() => {
            console.log('callback')
            // Click the button
            if(!isDisabled) {
                console.log('is not disabled')
                buttonEl.click()
                noPrize.redeemed = true;
                closeRewardsCenter();
                clearInterval(noPrize.interval)
            };
        }, 50);
    }
    // Mark as redeemed
    else {
        noPrize.redeemed = true;
        closeRewardsCenter();
        if(noPrize.interval !== null) clearInterval(noPrize.interval)
    }
}

const iframeSetup = () => {
    console.log('setting up iframe')
    window.addEventListener('message', (event) => {
        if (event.source !== bl3Iframe.node.contentWindow) {
            // console.log('non-node messages', event.data);
            return;
        }
        if (
            event.data?.payload?.type === 'mousemove'     // causes a ton of console noise
        ) {
            return;
        }

        // Log the message payload to the console
        console.log(event);
        if (event.data?.action === "twitch-ext-loaded") {
            console.log('iframe loaded');
            bl3Iframe.isLoaded = true;
        }
        if (
            event.data?.action === 'twitch-ext-pubsub-listen' &&
            event.data?.target === 'broadcast'
        ){
            console.log('iframe ready to broadcast');
            bl3Iframe.isBroadcasting = true
        }

        if (
            bl3Iframe.isBroadcasting &&
            bl3Iframe.isLoaded &&
            !bl3Iframe.testBroadcast
        ) {
            console.log('testing broadcast capabilities........');
            bl3Iframe.testBroadcast = true;
            /**
             * Windows:
             *  event.source (failed)
             *  bl3Iframe.parentWindow (failed)
             *      Got message from unexpected source https://supervisor.ext-twitch.tv {"action":"\"twitch-ext-user-action\"","payload":{"type":"focusin"}}
             *  window (failed)
             *      Got message from unexpected source https://supervisor.ext-twitch.tv {"action":"\"twitch-ext-user-action\"","payload":{"type":"focusin"}}
             * bl3Iframe.node.contentWindow
             *      Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://supervisor.ext-twitch.tv') does not match the recipient window's origin ('https://www.twitch.tv').
             */
            // bl3Iframe.parentWindow
            // bl3Iframe.node
            bl3Iframe.node.contentWindow.postMessage(focusIn, '*')
            // window
            // event.source.postMessage(focusIn, '*');
            // event.source.postMessage(clickInto, '*');
            // event.source.postMessage(clickThingy, '*');
                // .postMessage(eventData.data, 'https://supervisor.ext-twitch.tv');
            // window.postMessage(eventData.data, 'https://supervisor.ext-twitch.tv')
        }
    })
};
console.log(`script start => DOMContentLoaded Event Triggered`)

if (window.top === window.self) {
    console.log('This is the main page', location)
    const pointButtonIntvl = handlePointsButton()
}
else if (!bl3Iframe.node){
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLIFrameElement && node.src === bl3Iframe.src) {
                    bl3Iframe.node = node;
                    bl3Iframe.parentWindow = window;
                    iframeSetup()
                    observer.disconnect()
                }
            });
        });
    });

    observer.observe(document, {childList: true, subtree: true})
}

console.log('script end...')
/*
    To disable web security & allow access to iframe:
    Quit chrome, run this command via command line:
    open -a "Google Chrome.app" --args --disable-web-security --user-data-dir --disable-site-isolation-trials
*/

const timeDelayMS = 5000;
let elapsedTime = 0;
const wouldMiss = 60-12;
let pointsSavedToday = 7*(0);
let noPrize = {
    interval: null,
    isRunning: false,
    redeemed: false,
    button: null,
    redemptionTextElement: null
};
const pointsBalanceButton = document.querySelector('button[aria-label="Points Balance"]');

const closeRewardsCenter = () => {
    document
        .querySelector('.reward-center__content')
        .firstChild
        .firstChild
        .lastChild
        .querySelector('button')
        .click()
}

const clickBonusPoints = () => {
    let FeenixBar = document.querySelector('button[aria-label="Claim Bonus"]');
    const lastElapsedTime = elapsedTime;
    elapsedTime += timeDelayMS
    if (FeenixBar) {
        pointsSavedToday += (wouldMiss)
        FeenixBar.click()
        console.log(`${new Date().toLocaleTimeString()} (elapsed: ${elapsedTime/(1000*60)})  +${pointsSavedToday} points`)
        elapsedTime = 0;
    }
}

const enterEvent = (eventTitle) => {
    const toastHeader = Array
            .from(document.querySelectorAll('.toast-header'))
            .find((div) => div.innerHTML === eventTitle)
    if (toastHeader) {
        toastHeader.parentNode.querySelector('.toast-actions').querySelector('button').click()
        console.log(`Joined ${eventTitle}`)
    }
}
/*
document.querySelector('iframe').contentWindow
https://www.w3schools.com/howto/howto_js_element_iframe.asp
*/
const watchForSpecialEvent = () => {
    const toastHeader = document.querySelector('.toast-header');
    const toastSpacerSibling = document.querySelector('.toast-spacer');
    console.log(`toast spacer has sibling? ${toastSpacerSibling === null ? 'no' : 'yes'}`)
    if (toastSpacerSibling !== null) {
        console.log(`Toast header: ${toastHeader.innerHTML}`)
    }
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

const monitorPage = () => {
    clickBonusPoints();
    watchForSpecialEvent();
    enterEvent('Rare Chest Event');
    enterEvent('Extractor Breach Event');
    enterEvent('Badass Viewer Event');
}

// console.log('toast spacer', document.querySelector('.menu-wrap'))
console.log('toast spacer')

// if (autoClick) { clearInterval(autoClick) }
// const autoClick = setInterval(monitorPage, timeDelayMS);
// console.log(`started: ${new Date().toLocaleTimeString()}`);

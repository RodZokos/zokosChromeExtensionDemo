// this is the background code...
function init(tab) {
chrome.tabs.insertCSS(tab.ib, {file: "styles.css"});
chrome.tabs.executeScript({
	file: "jquery.js"
})
chrome.tabs.executeScript({
	file: "insert.js"
})
}

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	init(tab);
	// chrome.tabs.executeScript(tab.ib, {
	// 	file: 'inject.js'
	// });
});
/* eslint-disable no-undef */
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

let windowId;
chrome.tabs.onActivated.addListener((activeInfo) => {
  windowId = activeInfo.windowId;
});

// to receive messages from popup script
chrome.runtime.onMessage.addListener((message, sender) => {
  (async () => {
    if (message.action === 'openSidePanel') {
      chrome.sidePanel.open({ windowId });
    }
  })();
});

// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Hello World extension installed.");
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showBanner
    });
  }
});

function showBanner() {
  const banner = document.createElement('div');
  banner.textContent = 'Hello World';
  banner.style.position = 'fixed';
  banner.style.top = '50%';
  banner.style.left = '50%';
  banner.style.transform = 'translate(-50%, -50%)';
  banner.style.fontSize = '48px';
  banner.style.color = 'white';
  banner.style.backgroundColor = 'orange';
  banner.style.padding = '20px';
  banner.style.zIndex = '10000';
  banner.style.borderRadius = '10px';
  document.body.appendChild(banner);

  setTimeout(() => {
    document.body.removeChild(banner);
  }, 500);
}

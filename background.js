// background.js

async function loadJsonConfig(configPath = 'api.json') {
  const response = await fetch(chrome.runtime.getURL(configPath));
  if (!response.ok) {
    throw new Error(`无法加载配置文件: ${response.status}`);
  }
  return response.json();
}

async function fetchComments(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data.code !== 1 || !data.data || !data.data.content) {
    throw new Error('无效的评论数据');
  }
  return data.data.content;
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showBanner
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getComments") {
    loadJsonConfig()
      .then(apiConfig => fetchComments(apiConfig.get_163_comment.url))
      .then(content => sendResponse({ success: true, content: content }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // 保持消息通道开放，以便异步发送响应
  }
});

function showBanner() {
  chrome.runtime.sendMessage({ action: "getComments" }, response => {
    const banner = document.createElement('div');
    if (response.success) {
      banner.textContent = response.content || '没有获取到评论';
    } else {
      console.error('Error:', response.error);
      banner.textContent = '获取评论失败';
    }
    
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.fontSize = '24px';
    banner.style.color = 'white';
    banner.style.backgroundColor = 'orange';
    banner.style.padding = '20px';
    banner.style.zIndex = '10000';
    banner.style.borderRadius = '10px';
    banner.style.maxWidth = '80%';
    banner.style.maxHeight = '80%';
    banner.style.overflow = 'auto';
    
    document.body.appendChild(banner);

    setTimeout(() => {
      document.body.removeChild(banner);
    }, 5000);
  });
}

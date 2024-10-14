// background.js
import { loadJsonConfig, fetchComments } from './api.js';

// 事件监听器
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    try {
      const apiConfig = await loadJsonConfig();
      const content = await fetchComments(apiConfig.get_163_comment.url);
      
      // 使用 executeScript 注入并运行内容脚本
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showBanner,
        args: [content]
      });
    } catch (error) {
      console.error('获取评论失败:', error);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showBanner,
        args: ['获取评论失败']
      });
    }
  }
});

// 这个函数将被注入到内容脚本中
function showBanner(content) {
  const banner = document.createElement('div');
  banner.textContent = content;
  banner.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: white;
    background-color: orange;
    padding: 20px;
    z-index: 10000;
    border-radius: 10px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  `;
  document.body.appendChild(banner);

  const removeBanner = () => {
    if (document.body.contains(banner)) {
      document.body.removeChild(banner);
    }
  };

  banner.addEventListener('mouseenter', () => clearTimeout(banner.timer));
  banner.addEventListener('mouseleave', removeBanner);
  banner.timer = setTimeout(removeBanner, 5000);
}

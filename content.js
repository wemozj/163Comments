// console.log('内容脚本已加载');

// // UI 相关函数
// function createBanner(content) {
//   const banner = document.createElement('div');
//   banner.textContent = content;
//   banner.style.cssText = `
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-size: 24px;
//     color: white;
//     background-color: orange;
//     padding: 20px;
//     z-index: 10000;
//     border-radius: 10px;
//     max-width: 80%;
//     max-height: 80%;
//     overflow: auto;
//   `;
//   return banner;
// }

// function showBanner(content) {
//   const banner = createBanner(content);
//   document.body.appendChild(banner);

//   const removeBanner = () => {
//     if (document.body.contains(banner)) {
//       document.body.removeChild(banner);
//     }
//   };

//   banner.addEventListener('mouseenter', () => clearTimeout(banner.timer));
//   banner.addEventListener('mouseleave', removeBanner);
//   banner.timer = setTimeout(removeBanner, 5000);
// }

// // 监听来自背景脚本的消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "showBanner") {
//     showBanner(request.content);
//   }
// });

// // 通知背景脚本->内容脚本已加载
// chrome.runtime.sendMessage({ action: "contentScriptReady" });

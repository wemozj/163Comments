// api.js

// 配置相关函数
export async function loadJsonConfig(configPath = 'api.json') {
    try {
      const response = await fetch(chrome.runtime.getURL(configPath));
      if (!response.ok) {
        throw new Error(`无法加载配置文件: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('加载配置文件失败:', error);
      throw error;
    }
  }
  
  // API 相关函数
  export async function fetchComments(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code !== 1 || !data.data || !data.data.content) {
        throw new Error('无效的评论数据');
      }
      return data.data.content;
    } catch (error) {
      console.error('获取评论失败:', error);
      throw error;
    }
  }
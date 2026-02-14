// Clean headers to stop the "Hotlink Detected" error
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1],
  addRules: [{
    "id": 1,
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        { "header": "referer", "operation": "remove" },
        { "header": "origin", "operation": "remove" }
      ]
    },
    "condition": {
      "urlFilter": "pixeldrain.*",
      "resourceTypes": ["main_frame", "sub_frame", "xmlhttprequest", "other"]
    }
  }]
});

// Listen for the download request from content.js
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "open_clean") {
    chrome.tabs.create({ url: request.url, active: true });
  }
});

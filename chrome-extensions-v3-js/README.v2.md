注意配置文件`manifest.json`的升级：

1. `background` 采用了 service worker

```json
// v2
  "background": {
    "scripts": [
      "background.js"
    ]
  }

// v3
  "background": {
    "service_worker": "background.js"
  }
```

2. `permissions` 权限分离

```json
// v2
  "permissions": [
    "contextMenus",
    "proxy",
    "tabs"
  ]
// v3

```

3. `action`

```json
// v2
  "browser_action": {
    "default_title": "辅助",
    "default_icon": "icons/icon_48.png"
  },
// v3
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
        "16": "/images/tran.png",
        "32": "/images/tran.png",
        "48": "/images/tran.png",
        "128": "/images/tran.png"
    }
  }
```

4. `web_accessible_resources` 加载资源

```json
// v2
    "web_accessible_resources": [
        "inject.js",
    ]
// v3
  "web_accessible_resources": [
    {
      "resources": ["inject.js"],
      "matches": ["<all_urls>"]
    }
  ]
```

# 谷歌插件开发模板
使用不同的方式开发chrome插件。

## 使用插件
- chrome 浏览器地址栏输入 `chrome://extensions`
- 进入插件管理页面后点击右上角的 `开发者模式` 滑块
- 点击按钮 `加载已解压的扩展程序` 将子文件夹导入。

## 一个简单的hello word 插件
新建一个JSON文件manifest.json 输入以下配置：
```json
{
  "name": "插件doc",
  "description": "插件的官方文档版本!",
  "version": "1.0.0",
  "manifest_version": 3
}
```
## 插件采用3.0版本
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

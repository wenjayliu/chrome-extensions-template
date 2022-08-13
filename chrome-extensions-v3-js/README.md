# 谷歌插件开发（官方文档版 V3）

参考文档的一个 demo 项目，不依赖 webpack 等工具。

## 常用配置说明

content_scripts[].matches
`"matches": ["<all_urls>"]` 所有域名生效
`"matches": ["https://cn.bing.com/*"]` 域名内所有地址生效


## 原生JS缺陷
1. 无法模块化导致的问题
2. content.js 无法访问window对象（无法使用公共模块）

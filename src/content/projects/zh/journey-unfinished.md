---
title: 未完旅箋 Journey Unfinished
description: 讓帶著收藏娃娃旅行的人記錄旅程的互動網站。在世界地圖上標記地點、上傳照片、用 Markdown 寫下故事，並瀏覽其他旅人的旅箋。
year: 2026
tags: [網站, 地圖, 社群]
tech: [Nuxt 4, Vue 3, TypeScript, Nitro, SQLite, Leaflet, OpenStreetMap, Sharp, Docker]
links:
  repo: https://github.com/treeleaves30760/journey-unfinished
order: 3
---
「小小的你，世界很大。」未完旅箋是為一種特定旅人做的網站：帶著 Gal-Game 或原創收藏娃娃出門，沿途幫它們拍照的人。每一則旅箋在全球地圖上標記一個地點，附上照片與 Markdown 寫成的故事，所有人都能瀏覽。

## 重點功能

- 全球互動地圖，視野會依旅箋分布自動框定；可以搜尋景點，或直接在地圖上點選標記地點。
- 附即時預覽的 Markdown 編輯器；從自己的照片裁切娃娃頭像，建立娃娃檔案。
- 上傳的照片會自動移除 EXIF 與 GPS 資訊。
- 手機快速紀錄：出門先拍照存成草稿，回家再用電腦把故事寫完。
- 個人管理區支援批次操作，可匯出 CSV、JSON 與 GeoJSON。
- 匿名留言、Discord OAuth2 登入與管理後台。
- 安全強化：CSP 標頭、CSRF 防護、XSS 防範與速率限制。

以 Nuxt 4 與 Vue 3 建構，後端為 Nitro API 搭配 SQLite，用 Docker 部署。

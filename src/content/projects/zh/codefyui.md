---
title: CodefyUI
description: 為教學設計的視覺化節點式深度學習流程建構工具。用拖拉與連線組出 CNN、RNN、Transformer 與強化學習架構，不必寫樣板程式碼。
year: 2026
tags: [深度學習, 教學, 視覺化程式設計]
tech: [Python, PyTorch, FastAPI, React 19, TypeScript, React Flow, Zustand, Vite]
links:
  repo: https://github.com/CodefyUI/CodefyUI
  docs: https://docs.codefyui.com/
license: AGPL-3.0-only
order: 1
---
CodefyUI 把深度學習流程變成一張看得見的圖。你把層、損失函數、最佳化器與資料來源等節點拖到畫布上，連成 DAG，然後直接在瀏覽器裡執行。它的目的是讓學生在寫任何樣板程式碼之前就理解模型在做什麼，也讓老師能檢視每個節點實際產生的結果。

## 重點功能

- 16 個類別、152 個內建節點，涵蓋 CNN、RNN、Transformer 與強化學習的組成元件。
- Teaching Inspector 記錄每個節點的張量輸出，課堂上可以一步步走過整個 forward pass。
- Preset 把完成的圖存成可重複使用的模板；多分頁工作區讓各自獨立的執行環境並排運作。
- WebSocket 驅動的即時執行與進度回報、執行佇列、參數掃描，以及只重跑有變動節點的部分執行。
- 具型別檢查的連線在設計階段就拒絕不合法的連接。
- 自訂節點管理器與外掛系統；整合 git 版本控制。
- 介面提供英文與繁體中文。

完整文件在 docs.codefyui.com。程式碼以 AGPL-3.0 授權釋出，另提供商業授權。

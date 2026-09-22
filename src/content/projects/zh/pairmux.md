---
title: pairmux
description: 給 AI agent 用的可靠 tmux 終端機原語。真正的 PTY、可持續的 shell 狀態、會等待結果的指令執行，以及在 agent 卡住時交棒給人。
year: 2026
tags: [開發者工具, AI Agent, 終端機]
tech: [Go, tmux, Python]
links:
  repo: https://github.com/treeleaves30760/pairmux
  docs: https://treeleaves30760.github.io/pairmux/
  pypi: https://pypi.org/project/pairmux/
license: MIT
order: 4
---
Exec 式的 shell 工具沒有給 AI agent 一個真正的終端機，所以 REPL、`ssh` 密碼提示、`docker exec -it`、`git rebase -i`、分頁器與 TUI 對它們來說不只是不方便，而是根本做不到。pairmux 是架在 tmux 上的一層小型 agent-computer interface，讓這些東西變得可操作，同時讓人保持在迴圈裡。

## 重點功能

- 真正的 PTY 與可持續的 shell 狀態：啟用 virtualenv 或 export 變數只需做一次，不用塞進每一條指令。
- `run` 會等到指令完成、出現已知的提示，或逾時為止，並回報結束碼與耗時。
- 憑證與判斷題交給人：偵測到密碼提示時絕不自動作答；agent 等待，人在同一個即時終端機裡回答，工作接著繼續。
- 共同觀察：人可以 attach 進來看 agent 操作，並在指令進行中接手；每個終端機同一時間只有一個寫入者。
- Journal 保留完整歷史；`--json` 輸出帶版本的封包，包含狀態、整理過的輸出與復原提示。

以 Go 撰寫，可從 PyPI 與 Homebrew 安裝，MIT 授權。需要 tmux 3.2 以上。

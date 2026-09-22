---
title: all-code
description: 一次設定 LLM 供應商，就能用你選的供應商啟動 Claude Code、Codex CLI、OpenCode 等多個 coding agent 的統一命令列工具。
year: 2026
tags: [開發者工具, LLM, CLI]
tech: [Rust, tmux]
links:
  repo: https://github.com/treeleaves30760/all-code
  homepage: https://treeleaves30760.github.io/all-code/
license: MIT
order: 2
---
all-code（`alc`）解決一個同時使用多個 AI coding agent 的人都會遇到的麻煩：每個 agent 指定模型供應商的方式都不一樣。用 all-code 只要設定一次供應商，就能用任何支援的供應商啟動任何支援的 agent，包括讓 Claude Code 跑在你已經付費的 ChatGPT／Codex 訂閱上。

## 重點功能

- 一次登入涵蓋八個 coding agent：Claude Code、Codex CLI、OpenCode、Pi、Copilot CLI、Goose、Qwen Code 與 Kimi Code CLI。
- 十四種供應商類型，包括 Anthropic、OpenAI、OpenRouter、Ollama、vLLM、DeepSeek、Moonshot、Z.ai、MiniMax、Groq、xAI、Google 與自訂端點。
- 內建 Codex bridge，讓 Claude Code 透過 ChatGPT／Codex 登入運作。
- 遠端操控：把任何 session 鏡射到瀏覽器頁面，用手機或另一台電腦操作。
- Session 管理、用量追蹤與診斷；支援 tmux，在 Windows、macOS 與 Linux 上維持持續性 session。

以 Rust 撰寫，MIT 授權釋出。

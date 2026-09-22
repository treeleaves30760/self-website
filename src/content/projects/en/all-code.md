---
title: all-code
description: A unified CLI that configures LLM providers once, then launches Claude Code, Codex CLI, OpenCode and other coding agents with the provider you choose.
year: 2026
tags: [Developer Tools, LLM, CLI]
tech: [Rust, tmux]
links:
  repo: https://github.com/treeleaves30760/all-code
  homepage: https://treeleaves30760.github.io/all-code/
license: MIT
order: 2
---
all-code (`alc`) solves an annoying problem for people who use several AI coding agents: every agent has its own way of being pointed at a model provider. With all-code you configure providers once and launch any supported agent with any provider, including running Claude Code on the ChatGPT/Codex subscription you already pay for.

## Highlights

- One login covers eight coding agents: Claude Code, Codex CLI, OpenCode, Pi, Copilot CLI, Goose, Qwen Code and Kimi Code CLI.
- Fourteen provider kinds, including Anthropic, OpenAI, OpenRouter, Ollama, vLLM, DeepSeek, Moonshot, Z.ai, MiniMax, Groq, xAI, Google and custom endpoints.
- Built-in Codex bridge routes Claude Code through a ChatGPT/Codex login.
- Remote control: mirror any session to a browser page and drive it from a phone or another machine.
- Session management, usage tracking and diagnostics; tmux support for persistent sessions on Windows, macOS and Linux.

Written in Rust and released under the MIT license.

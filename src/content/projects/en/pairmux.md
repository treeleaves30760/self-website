---
title: pairmux
description: Reliable terminal primitives for AI agents on tmux. A real PTY with persistent shell state, blocking command outcomes and human handoff when it gets stuck.
year: 2026
tags: [Developer Tools, AI Agents, Terminal]
tech: [Go, tmux, Python]
links:
  repo: https://github.com/treeleaves30760/pairmux
  docs: https://treeleaves30760.github.io/pairmux/
  pypi: https://pypi.org/project/pairmux/
license: MIT
order: 4
---
Exec-style shell tools give an AI agent no terminal, so REPLs, `ssh` password prompts, `docker exec -it`, `git rebase -i`, pagers and TUIs are impossible rather than merely awkward. pairmux is a small agent-computer-interface layer over tmux that makes them drivable while keeping a human in the loop.

## Highlights

- A real PTY with persistent shell state: activate a virtualenv or export a variable once instead of re-composing it into every command.
- `run` blocks until a command completes, a recognised prompt appears, or a timeout expires, and reports exit code and duration.
- Human handoff on credentials and judgment calls: a secret prompt is never auto-answered; the agent waits, a person answers in the same live terminal, and work resumes.
- Shared observation: humans can attach, watch the agent work and take over mid-command; only one writer per terminal.
- Journals retain full history; `--json` emits a versioned envelope with status, shaped output and recovery hints.

Written in Go, installable from PyPI and Homebrew, MIT licensed. Requires tmux 3.2 or newer.

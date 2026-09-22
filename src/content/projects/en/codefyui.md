---
title: CodefyUI
description: A visual, node-based deep learning pipeline builder for education. Design CNN, RNN, Transformer and RL architectures by dragging and connecting nodes.
year: 2026
tags: [Deep Learning, Education, Visual Programming]
tech: [Python, PyTorch, FastAPI, React 19, TypeScript, React Flow, Zustand, Vite]
links:
  repo: https://github.com/CodefyUI/CodefyUI
  docs: https://docs.codefyui.com/
license: AGPL-3.0-only
order: 1
---
CodefyUI turns a deep learning pipeline into a graph you can see. You drag nodes for layers, losses, optimizers and data sources onto a canvas, connect them into a DAG, and run the whole thing from the browser. It exists so that students can understand what a model does before they write a line of boilerplate, and so that instructors can inspect exactly what every node produced.

## Highlights

- 152 built-in nodes across 16 categories, covering CNN, RNN, Transformer and reinforcement learning building blocks.
- Teaching Inspector records the tensor output of every node so a class can step through a forward pass.
- Presets turn a finished graph into a reusable template; a multi-tab workspace keeps independent execution contexts side by side.
- WebSocket-driven execution with live progress, a run queue, parameter sweeps and partial re-execution of only the changed nodes.
- Type-safe edges reject invalid connections at design time.
- Custom node manager and plugin system; git-based source control integration.
- Interface available in English and Traditional Chinese.

Full documentation lives at docs.codefyui.com. The code is AGPL-3.0 licensed, with commercial licensing available.

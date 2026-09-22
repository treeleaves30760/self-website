---
title: Inductive Visual Logic for Few-Shot Out-Of-Distribution Adaptation in VLMs
authors: [Hung-Jen Chen, Yu-Heng Ho, Ting-Yao Huang, Po-Hsiang Hsu, Li-Yu Chen, Chun-Yi Lee, Min Sun]
venue: ECCV 2026
venueFull: European Conference on Computer Vision (ECCV) 2026
year: 2026
date: "2026-09-11"
links:
  pdf: https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/3450.pdf
  venuePage: https://eccv.ecva.net/virtual/2026/poster/3863
  project: https://ivl-demo.xn--essy41b.com/
  openreview: https://openreview.net/forum?id=cf0yp18EeD
description: A training-free framework that adapts vision-language models to distant out-of-distribution domains from a few examples by reasoning over visual traits.
order: 1
---
Generative vision-language models (VLMs) such as Qwen-VL and LLaVA achieve strong zero-shot performance on tasks overlapping with their pretraining distribution, yet fail on specialized domains where the required discriminative features were never learned, a regime we term distant out-of-distribution (OOD). Standard adaptation methods cannot overcome this representational absence because they operate within the encoder's existing feature space. However, VLMs retain a robust descriptive capacity even when discrimination collapses: a model that cannot classify a medical scan can still articulate its visual patterns. Exploiting this asymmetry, we introduce Inductive Visual Logic (IVL), a training-free framework that constructs classification knowledge from the model's surviving descriptive ability. IVL extracts visual traits from few-shot support images through dual-mode prompting, combining semantic descriptions with primitive visual observations, and organizes them into per-class trait dictionaries. At inference, hierarchical filtering identifies spatially grounded trait evidence for classification. Across multiple distant-OOD benchmarks, IVL achieves the highest aggregate accuracy under two VLM backbones while producing interpretable, trait-traceable predictions.

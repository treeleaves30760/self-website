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
description: 以少量樣本讓視覺語言模型適應遠距離分布外領域的免訓練框架：從樣本歸納出視覺特徵，再以推理進行分類。
order: 1
---
Qwen-VL 與 LLaVA 這類生成式視覺語言模型（VLM），在與預訓練分布重疊的任務上有很強的零樣本表現，卻在需要模型從未學過的判別特徵的專業領域失效；我們把這種情況稱為「遠距離分布外」（distant OOD）。標準的適應方法無法克服這種表徵缺失，因為它們只能在編碼器既有的特徵空間內運作。然而即使判別能力崩潰，VLM 仍保有穩健的描述能力：一個無法分類醫學影像的模型，仍然能說出影像中的視覺模式。利用這種不對稱性，我們提出 Inductive Visual Logic（IVL），一個免訓練的框架，從模型仍保有的描述能力中建構分類知識。IVL 透過雙模式提示，結合語意描述與基本的視覺觀察，從少量支援影像中擷取視覺特徵，並整理成每個類別的特徵字典。推論時，階層式過濾會找出有空間依據的特徵證據來進行分類。在多個遠距離分布外基準上，IVL 在兩種 VLM 骨幹下都取得最高的整體準確率，同時產生可解釋、可追溯到特徵的預測。

（以上為英文摘要的中文翻譯；原文請見 PDF。）

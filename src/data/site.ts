import type { Lang } from '../i18n/ui';

type L<T = string> = Record<Lang, T>;

export const site = {
  url: 'https://www.treeleaves30760.com',
  owner: { en: 'Po-Hsiang Hsu', zh: '許博翔' } satisfies L,
  /** Every spelling that should be bolded in author lists. */
  ownerNames: ['Po-Hsiang Hsu', '許博翔'],
  email: 'treeleaves30760@gmail.com',
  github: 'https://github.com/treeleaves30760',
  linkedin: 'https://www.linkedin.com/in/hsupohsiang/',
  scholar: 'https://scholar.google.com/citations?user=J6DALFIAAAAJ',
  siteName: { en: 'Po-Hsiang Hsu', zh: '許博翔' } satisfies L,
  homeTitle: {
    en: 'Po-Hsiang Hsu (許博翔) · LLM & VLM Research, NTHU EE',
    zh: '許博翔 (Po-Hsiang Hsu) · 清華電機 LLM 與 VLM 研究',
  } satisfies L,
  homeDescription: {
    en: 'M.S. student in Electrical Engineering at National Tsing Hua University working on LLMs and vision-language models; author of CodefyUI, all-code and pairmux.',
    zh: '許博翔，國立清華大學電機工程學系碩士生，研究大型語言模型與視覺語言模型，也是 CodefyUI、all-code 與 pairmux 的作者。',
  } satisfies L,
  headline: {
    en: 'M.S. student in Electrical Engineering at National Tsing Hua University, working on large language models and vision-language models.',
    zh: '國立清華大學電機工程學系碩士生，研究大型語言模型與視覺語言模型。',
  } satisfies L,
  bio: {
    en: 'I work on adapting large language models and vision-language models to new domains, and on using LLM agents to automate engineering work such as analog circuit design. On the side I build open-source developer tools for AI coding agents and for teaching deep learning.',
    zh: '我的研究聚焦在讓大型語言模型與視覺語言模型適應新領域，以及用 LLM agent 自動化類比電路設計這類工程工作。工作之餘我開發開源工具，服務 AI coding agent 與深度學習教學。',
  } satisfies L,
  about: {
    en: [
      'I am Po-Hsiang Hsu (許博翔), an M.S. student in Electrical Engineering at National Tsing Hua University in Hsinchu, Taiwan. My research focuses on large language models and vision-language models: how they can adapt to domains far from their pretraining data with only a handful of examples, and how LLM agents can take over specialised engineering workflows.',
      'That work has produced two publications: Inductive Visual Logic (ECCV 2026), a training-free framework for few-shot adaptation of VLMs to distant out-of-distribution domains, and MenTeR (IEEE ICLAD 2025), a fully automated multi-agent workflow that turns RF/analog circuit specifications into netlists.',
      'Outside research I build open-source tools: CodefyUI, a visual node-based deep learning pipeline builder for education; all-code, a CLI that configures LLM providers for many coding agents at once; pairmux, tmux terminal primitives for AI agents; and Journey Unfinished, a travel journal website.',
    ],
    zh: [
      '我是許博翔（Po-Hsiang Hsu），國立清華大學電機工程學系碩士生。研究主題是大型語言模型與視覺語言模型：如何只靠少量樣本，讓模型適應和預訓練資料差距很大的領域，以及如何讓 LLM agent 接手專業的工程流程。',
      '這些研究產出了兩篇論文：Inductive Visual Logic（ECCV 2026），一個讓視覺語言模型以免訓練方式適應遠距離分布外領域的少樣本框架；以及 MenTeR（IEEE ICLAD 2025），一套把 RF／類比電路規格自動轉成 netlist 的全自動多代理工作流程。',
      '研究之外我也開發開源工具：CodefyUI，為教學設計的視覺化節點式深度學習流程建構工具；all-code，一次設定 LLM 供應商、供多個 coding agent 使用的命令列工具；pairmux，給 AI agent 用的 tmux 終端機原語；以及旅行紀錄網站「未完旅箋」。',
    ],
  } satisfies L<string[]>,
  jobTitle: { en: 'M.S. student in Electrical Engineering', zh: '電機工程學系碩士生' } satisfies L,
  affiliation: { en: 'National Tsing Hua University', zh: '國立清華大學' } satisfies L,
} as const;

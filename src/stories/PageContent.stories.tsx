import type { Meta, StoryObj } from '@storybook/react';
import { PostWithIdItem } from "../app/post/[id]/PostWithIdItem";
import '@/app/globals.css'

const meta = {
    title: 'PageContent',
    component: PostWithIdItem,
    tags: ['autodocs'],
} satisfies Meta<typeof PostWithIdItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = `### 重點

- 安裝 plugin，在 .storybook/main.ts 設定使用該 plugin
- 如果只是有檔名的 alias（e.g. \`@\`） ，可以在 .storybook/main.ts 設定即可

### 實作

- plugin

\`\`\`tsx
// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
framework: '@storybook/your-framework',
stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
webpackFinal: async (config) => {
if (config.resolve) {
config.resolve.plugins = [
...(config.resolve.plugins || []),
new TsconfigPathsPlugin({
  extensions: config.resolve.extensions,
}),
];
}
return config;
},
};

export default config;
\`\`\`

- 檔名的 alias

\`\`\`tsx
import path from 'path';
// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
framework: '@storybook/your-framework',
stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
webpackFinal: async (config) => {
if (config.resolve) {
config.resolve.alias = {
...config.resolve.alias,
'@': path.resolve(__dirname, '../src'),
};
}
return config;
},
};

export default config;
\`\`\`


---

### REF

- https://storybook.js.org/docs/builders/webpack#troubleshooting`;
export const PageContent: Story = {
    args: {
        post: {
            id: '1',
            title: '【Storybook】Storybook 使用 tsconfig',
            description: '安裝 plugin 或設定 alias',
            content,
            tags: '',
        }
    }
}
const content1 = `---

## 概要

### 種類與主題

- 環保呼籲，被譽為推進歷史的十大影響力書本之一。

### 這本書在說什麼？

- 寂靜的春天，春天不再像以前那般生意盎然，為什麼？
- 作者頗析農藥、殺蟲劑為昆蟲動物和「人類」帶來的危害。

---

## 關鍵

![]( https://images.unsplash.com/photo-1490661632052-a8a414bf5f63?q=70&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA== )

### 內吸式殺蟲劑。

- 不是作用於蟲蟲身上，而是將農藥給植物吸收進去（內吸），其毒素會擴散到整株植物。
- 等蟲蟲吃到植物，才會發現事情大條。

### 含有砷的殺蟲劑，超毒！

- 有機砷化合物的殺蟲劑毒性較低，但也不可小覷，因為這些重金屬會在體內持續累積！
- 無機砷很毒，是一種已知的人類致癌物，帶來立即性的危害，更可怕。

### 覺得殺蟲劑只會針對在「殺蟲」而已嗎？ 怎麼可能！

- 化學物除了殃及農地，水源當然也會受影響！
- 流到河川之後，一路流向大海，海洋生物也備受影響！！
- 牽一髮動全身，我們的自私不只影響周圍的人類，也波及千千萬萬生物的整理生態圈。

### 結語：富有創意的「殺蟲」方法。

- 現在大家都已經知道，強效殺蟲只會帶來強力「反抗」，蟲蟲的抗藥性一代比一代強！
- 那有沒有更好的方法？ 有的，就靠大家的創意了！
- 書中提到一些做法，像是誘引劑（合成或提煉吸引蟲蟲的費洛蒙）、超聲波驅趕、改造的絕育生物（沒有生育能力的改造生物）…等，都比原有的殺蟲方式更「直接」且有效，但在研發上可沒這麼容易就是了。
- 當然比較好的是現在大家熟知的生物防治（這對 1950 年代的人們，可能相當新穎），一物剋一物，與大自然共存，才是根本之道（*可見「不耕作農法」的相關作法）。

## 總結

- 此書是促成 DDT 禁用的關鍵推手，書中清楚表列出殺蟲劑對於人類、生態，乃至於整個地球帶來的危害。
- 此書付梓已過了六七十載，現在的春天，有變得比較「不安靜」了嗎？ 還是比以前更寂靜，或者說是「寂寞」了呢？

---

## REF

- 書 — 寂靜的春天`;
export const PageContent2: Story = {
    args: {
        post: {
            id: '1',
            title: '【Storybook】Storybook 使用 tsconfig',
            description: '安裝 plugin 或設定 alias',
            content: content1,
            tags: '',
        }
    }
}

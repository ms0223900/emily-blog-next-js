import type { Meta, StoryObj } from '@storybook/react';
import { PostWithIdItem } from "../app/post/[id]/PostWithIdItem";

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

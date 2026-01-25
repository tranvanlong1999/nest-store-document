import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themeConfig } from './config/theme';

const config: Config = {
    title: 'Nest Store',
    tagline: 'E-commerce Platform Documentation',
    favicon: 'img/favicon.ico',

    future: {
        v4: true,
    },

    url: 'https://nest-store.example.com',
    baseUrl: '/',

    organizationName: 'nest-store',
    projectName: 'nest-store-docs',

    onBrokenLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'vi'],
    },

    markdown: {
        mermaid: true
    },
    themes: [
        '@docusaurus/theme-mermaid',
        '@r74tech/docusaurus-plugin-panzoom',
        'docusaurus-theme-openapi-docs'
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    includeCurrentVersion: true,
                    docItemComponent: '@theme/ApiItem',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        './plugins/tailwind-plugin.js',
        [
            'ideal-image',
            {
                quality: 70,
                max: 1030,
                min: 640,
                steps: 2,
                disableInDev: true
            }
        ],
        [
            'docusaurus-plugin-openapi-docs',
            {
                id: 'openapi',
                docsPluginId: 'classic',
                config: {
                    // helixApi: {
                    //     specPath: 'api-swagger/helix-api.yaml',
                    //     outputDir: 'docs/api/helix',
                    //     sidebarOptions: {
                    //         groupPathsBy: 'tag',
                    //         categoryLinkSource: 'tag'
                    //     },
                    //     showSchemas: true,
                    //     hideSendButton: false
                    // },
                }
            }
        ]
    ],

    themeConfig,
};

export default config;

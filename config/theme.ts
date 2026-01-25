import { themes as prismThemes } from 'prism-react-renderer';
import type { ThemeConfig } from '@docusaurus/preset-classic';

export const themeConfig: ThemeConfig = {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
        respectPrefersColorScheme: true,
    },
    navbar: {
        title: 'HELIX//CORE',
        items: [
            {
                type: 'dropdown',
                position: 'left',
                label: 'Giải Pháp Công Nghệ',
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'deploymentArchitectureSidebar',
                        label: 'Mô hình triển khai'
                    },
                    {
                        type: 'doc',
                        docId: 'giai-phap-cong-nghe/tai-lieu-ky-thuat/tong-quan/tong-quan',
                        label: 'Tài liệu kỹ thuật',
                        sidebarId: 'technicalDocumentationSidebar'
                    }
                ]
            },
            {
                type: 'docSidebar',
                sidebarId: 'sdkSidebar',
                label: 'SDKs',
                position: 'left',
            },
            {
                to: '/docs/api/helix',
                label: 'Thử nghiệm API',
                position: 'left',
            },
            {
                type: 'docsVersionDropdown',
                position: 'right',
                dropdownActiveClassDisabled: true,
            },
        ],
    },
    footer: {
        style: 'dark',
        logo: {
            alt: 'Helix Core',
            src: 'img/logo.svg',
            srcDark: 'img/logo-dark.svg',
            width: 0,
            height: 0,
        },
        links: [
            {
                title: 'Product',
                items: [
                    {
                        label: 'Overview',
                        to: '/docs/tong-quan',
                    },
                    {
                        label: 'Documentation',
                        to: '/docs/muc-luc',
                    },
                    {
                        label: 'Architecture',
                        to: '/docs/2-thiet-ke/tai-lieu-thiet-ke-he-thong-microservice',
                    },
                    {
                        label: 'Use Cases',
                        to: '/docs/2-thiet-ke/danh-sach-use-cases-cho-mvp',
                    },
                ],
            },
            {
                title: 'Resources',
                items: [
                    {
                        label: 'Getting Started',
                        to: '/docs/1-khoi-tao-lap-ke-hoach/tuyen-bo-tam-nhin-va-pham-vi-du-an',
                    },
                    {
                        label: 'Project Plan',
                        to: '/docs/1-khoi-tao-lap-ke-hoach/ke-hoach-quan-ly-du-an',
                    },
                    {
                        label: 'System Requirements',
                        to: '/docs/1-khoi-tao-lap-ke-hoach/tai-lieu-yeu-cau-he-thong-chuc-nang',
                    },
                ],
            },
            {
                title: 'Community',
                items: [
                    {
                        label: 'GitHub',
                        href: 'https://github.com',
                    },
                    {
                        label: 'Discord',
                        href: 'https://discord.com',
                    },
                    {
                        label: 'Twitter',
                        href: 'https://twitter.com',
                    },
                    {
                        label: 'LinkedIn',
                        href: 'https://linkedin.com',
                    },
                ],
            },
            {
                title: 'Legal',
                items: [
                    {
                        label: 'Privacy Policy',
                        href: '#',
                    },
                    {
                        label: 'Terms of Service',
                        href: '#',
                    },
                    {
                        label: 'SLA',
                        href: '#',
                    },
                    {
                        label: 'Security',
                        href: '#',
                    },
                ],
            },
        ],
        copyright: `
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #9ca3af;">
                    © ${new Date().getFullYear()} Helix Core. All rights reserved.
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #6b7280;">
                    Nền tảng marketplace thống nhất cho việc phân phối và tiêu thụ API services.
                </div>
            </div>
        `,
    },
    prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
            'bash',
            'json',
            'yaml',
            'http',
            'javascript',
            'typescript',
            'python',
            'java',
            'csharp',
            'php',
            'ruby',
            'go',
            'rust',
            'dart',
            'kotlin',
            'swift'
        ],
    },
    zoom: {
        selectors: ['div.mermaid[data-processed="true"]', 'div.docusaurus-mermaid-container'],
        wrap: true,
        timeout: 1000,
        excludeClass: 'panzoom-exclude',
    },
};

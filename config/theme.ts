import { themes as prismThemes } from "prism-react-renderer";
import type { ThemeConfig } from "@docusaurus/preset-classic";

export const themeConfig: ThemeConfig = {
  image: "img/docusaurus-social-card.jpg",

  colorMode: {
    respectPrefersColorScheme: true,
  },
    navbar: {
        title: "NEST STORE",
        items: [
            {
                type: "doc",
                docId: "giai-phap-cong-nghe/tai-lieu-ky-thuat/tong-quan",
                label: "Tài liệu kỹ thuật",
                position: "left",
            },
            {
                type: "docsVersionDropdown",
                position: "right",
                dropdownActiveClassDisabled: true,
            },
        ],
    },
    footer: {
        style: "dark",
        links: [
            {
                title: "Tài liệu hệ thống",
                items: [
                    {
                        label: "Quản lý sản phẩm",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thiet-ke/use-cases/product-management/uc01-xem-danh-sach-san-pham",
                    },
                    {
                        label: "Quản lý đơn hàng",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thiet-ke/use-cases/order-management/uc03-them-vao-gio-hang",
                    },
                    {
                        label: "Quản lý người dùng",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thiet-ke/use-cases/user-management/uc05-dang-nhap-he-thong",
                    },
                ],
            },
            {
                title: "Kiến trúc & Công nghệ",
                items: [
                    {
                        label: "Kiến trúc hệ thống",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/kien-truc-he-thong",
                    },
                    {
                        label: "Backend Stack",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/backend-stack",
                    },
                    {
                        label: "Frontend Stack",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/frontend-stack",
                    },
                    {
                        label: "Người dùng & Bảo mật",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/nguoi-dung-bao-mat",
                    },
                    {
                        label: "Thiết kế API",
                        to: "/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thiet-ke-api",
                    },
                ],
            },
            {
                title: "Cộng đồng",
                items: [
                    {
                        label: "GitHub",
                        href: "https://github.com",
                    },
                ],
            },
        ],
        copyright: `
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #9ca3af;">
                    © ${new Date().getFullYear()} Nest Store. Bảo lưu mọi quyền.
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #6b7280;">
                    Nền tảng thương mại điện tử hiện đại, ổn định và có khả năng mở rộng vượt trội.
                </div>
            </div>
        `,
    },
  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
    additionalLanguages: [
      "bash",
      "json",
      "yaml",
      "http",
      "javascript",
      "typescript",
      "python",
      "java",
      "csharp",
      "php",
      "ruby",
      "go",
      "rust",
      "dart",
      "kotlin",
      "swift",
    ],
  },
  zoom: {
    selectors: [
      'div.mermaid[data-processed="true"]',
      "div.docusaurus-mermaid-container",
    ],
    wrap: true,
    timeout: 1000,
    excludeClass: "panzoom-exclude",
  },
};

---
title: "Công nghệ: Frontend Stack"
description: Chi tiết về các công nghệ Frontend, UI/UX và công cụ phát triển.
---

# Công nghệ: Frontend Stack

Hệ thống Nest Store Frontend được thiết kế để mang lại trải nghiệm mua sắm mượt mà, tốc độ phản hồi cực nhanh và giao diện tinh tế trên mọi thiết bị.

## 1. Core Framework & Language

- **Next.js (v14.2.3):** Framework chính để xây dựng ứng dụng React, hỗ trợ SSR, Routing và tối ưu hóa hiệu năng.
- **React (v18.2.0):** Thư viện nền tảng để xây dựng giao diện người dùng.
- **TypeScript (v5.1.6):** Ngôn ngữ lập trình giúp kiểm soát kiểu dữ liệu chặt chẽ, giảm thiểu lỗi runtime.

## 2. Styling & UI Components (Giao diện)

- **Tailwind CSS (v3.4.1):** Framework CSS theo hướng utility-first để thiết kế giao diện nhanh chóng.
- **Radix UI:** Bộ thư viện các component "không giao diện" (headless UI) giúp xây dựng các UI phức tạp (Modal, Select, Dropdown) với khả năng truy cập tốt (Accessibility).
- **Framer Motion:** Thư viện mạnh mẽ để tạo các hiệu ứng chuyển động và animation mượt mà.
- **Lucide React:** Bộ sưu tập icon hiện đại và nhẹ.
- **Sonner:** Thư viện hiển thị thông báo (toast notifications) tinh tế.
- **Carousel/Sliders:** Sử dụng đồng thời **Embla Carousel**, **Swiper**, và **Slick Carousel** cho các thành phần trình chiếu.

## 3. State Management & Data Fetching (Quản lý dữ liệu)

- **TanStack Query (React Query v4):** Quản lý việc gọi API, lưu bộ nhớ đệm (cache) và xử lý trạng thái dữ liệu từ server.
- **Zustand:** Thư viện quản lý trạng thái ứng dụng (Global State) đơn giản và hiệu quả.
- **Axios:** HTTP Client để thực hiện các yêu cầu kết nối với Backend.

## 4. Form Handling & Validation (Xử lý biểu mẫu)

- **React Hook Form:** Thư viện quản lý các form một cách tối ưu, tránh render thừa.
- **Zod:** Thư viện xác thực dữ liệu (schema validation) đi kèm với React Hook Form để kiểm tra tính hợp lệ của dữ liệu đầu vào.

## 5. Internationalization (Đa ngôn ngữ)

- **next-i18next:** Hỗ trợ đa ngôn ngữ (i18n) cho ứng dụng Next.js, giúp dễ dàng mở rộng sang nhiều thị trường.

## 6. DevOps & Tools (Công cụ phát triển)

- **Package Manager:** Sử dụng **pnpm** (nhanh và tiết kiệm dung lượng hơn npm/yarn).
- **Docker:** Đã cấu hình sẵn `Dockerfile` và `docker-compose` để dễ dàng triển khai ứng dụng.
- **Git Hooks:** Sử dụng **Husky** và **Commitlint** để kiểm tra code và quy chuẩn tin nhắn commit.
- **Code Quality:** **ESLint** và **Prettier** giúp duy trì quy chuẩn và định dạng code đồng nhất.

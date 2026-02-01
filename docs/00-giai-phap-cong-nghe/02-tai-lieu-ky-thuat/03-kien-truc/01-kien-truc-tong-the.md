---
title: Kiến trúc Hệ thống
description: Mô tả kiến trúc Modular Monolith và các thành phần kỹ thuật.
---

# Kiến trúc Hệ thống Nest Store

Hệ thống Nest Store được xây dựng theo kiến trúc **Modular Monolith** (Đơn khối module hóa), kết hợp với các giải pháp xử lý phân tán để đảm bảo hiệu năng và khả năng bảo trì.

## 1. Mô hình Modular Monolith

Thay vì chia nhỏ thành các microservices ngay từ đầu, hệ thống được tổ chức thành các domain module tách biệt bên trong một codebase duy nhất. Điều này giúp:

- Giảm chi phí vận hành (operational complexity).
- Đảm bảo tính nhất quán (transactional integrity) dễ dàng hơn.
- Sẵn sàng để tách ra microservices khi cần scale lớn.

### Các Domain Module

- `product`: Quản lý catalog và tồn kho.
- `order`: Xử lý checkout và quản lý trạng thái đơn hàng.
- `user`: Authentication, Authorization và Profile.
- `marketing`: CMS cho blog và engine khuyến mãi.
- `notify`: Xử lý thông báo bất đồng bộ.

## 2. Các Thành phần Kỹ thuật (Technical Stack)

| Thành phần          | Công nghệ        | Mục đích                                                      |
| :------------------ | :--------------- | :------------------------------------------------------------ |
| **Ngôn ngữ**        | Java 21          | Hiệu năng cao, tính bao đóng tốt.                             |
| **Framework**       | Spring Boot 3.4  | Hệ sinh thái mạnh mẽ, dependency injection.                   |
| **Database**        | PostgreSQL       | Lưu trữ dữ liệu quan hệ, ACID compliance.                     |
| **Workflow Engine** | **Temporal**     | Quản lý các luồng nghiệp vụ dài hại (Long-running processes). |
| **Message Broker**  | Apache Kafka     | Liên kết giữa các module qua sự kiện (Event-driven).          |
| **Cache**           | Redis / Caffeine | Tăng tốc độ truy vấn và quản lý session.                      |
| **Object Storage**  | MinIO            | Lưu trữ ảnh sản phẩm, tài liệu blog.                          |

## 3. Luồng xử lý Workflow với Temporal

Hệ thống sử dụng **Temporal** để đảm bảo các quy trình quan trọng như **Đặt hàng & Thanh toán** được thực thi tin cậy (Resilient Execution):

- **Tự động Retry:** Nếu một service (như cổng thanh toán) gặp lỗi tạm thời.
- **Saga Pattern:** Thực hiện hoàn tác (compensating transactions) nếu một bước trong quy trình thất bại.
- **State Persistence:** Trạng thái của workflow được lưu trữ bền vững, không bị mất khi ứng dụng khởi động lại.

## 4. Giao diện (Frontend)

Hệ thống giao diện được phát triển bằng **Next.js 14**, tận dụng **App Router**, **Server Components** để tối ưu hóa SEO và tốc độ tải trang.

- **Styling:** Tailwind CSS & Radix UI.
- **Data Fetching:** TanStack Query.
- **Deployment:** Vercel hoặc Dockerized Node.js runtime.

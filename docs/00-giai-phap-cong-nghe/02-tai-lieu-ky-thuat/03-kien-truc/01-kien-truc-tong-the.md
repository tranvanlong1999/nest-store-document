---
title: Kiến trúc Hệ thống
description: Mô tả kiến trúc Microservices và các thành phần kỹ thuật.
---

# Kiến trúc Hệ thống Nest Store

Hệ thống Nest Store được xây dựng theo kiến trúc **Microservices** (Kiến trúc vi dịch vụ), kết hợp với các giải pháp xử lý phân tán để đảm bảo hiệu năng và khả năng bảo trì.

## 1. Mô hình Microservices

Hệ thống được tổ chức thành các **Microservices** độc lập, giao tiếp với nhau qua mạng (REST API / gRPC / Kafka). Điều này mang lại các lợi ích:

- **Khả năng mở rộng độc lập:** Có thể scale từng service riêng biệt dựa trên tải thực tế (ví dụ: chỉ scale Order Service trong dịp sale).
- **Công nghệ đa dạng:** Mỗi team có thể chọn công nghệ phù hợp nhất cho service của mình (Polyglot).
- **Triển khai độc lập:** Việc deploy một service không ảnh hưởng đến toàn bộ hệ thống.

### Các Microservices Chính

- `product-service`: Quản lý catalog, thông tin sản phẩm và tồn kho.
- `order-service`: Xử lý luồng checkout, quản lý đơn hàng và thanh toán.
- `user-service`: Authentication (SSO), Authorization và quản lý thông tin người dùng.
- `marketing-service`: CMS cho bài viết blog và engine quản lý chương trình khuyến mãi.
- `notification-service`: Xử lý gửi email, SMS, push notification đa kênh bất đồng bộ.

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

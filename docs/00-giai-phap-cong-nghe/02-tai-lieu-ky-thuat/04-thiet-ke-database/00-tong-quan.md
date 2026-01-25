---
title: Tổng quan Thiết kế Database
description: Quy chuẩn và kiến trúc lưu trữ dữ liệu của Nest Store.
---

# Tổng quan Thiết kế Database

Hệ thống Nest Store sử dụng **PostgreSQL** làm cơ sở dữ liệu quan hệ chính, được thiết kế theo mô hình **Modular Monolithic** với ranh giới dữ liệu rõ ràng giữa các phân hệ.

## 1. Nguyên tắc Thiết kế Cốt lõi

- **Tính nhất quán (ACID)**: Đảm bảo mọi giao dịch mua hàng, thanh toán đều an toàn và chính xác tuyệt đối.
- **Định danh UUID v4**: Sử dụng UUID làm khóa chính cho tất cả các thực thể quan trọng (Product, Order, User) để đảm bảo tính duy nhất trong môi trường phân tán và an toàn thông tin (tránh IDOR).
- **Soft Delete**: Các bản ghi quan trọng không bị xóa vật lý mà được đánh dấu qua trạng thái (status) hoặc cờ xóa để phục vụ mục đích Audit.
- **Auditing Fields**: Mọi bảng đều chứa `created_date` và `updated_date` để theo dõi vòng đời dữ liệu.

## 2. Phân tách Module Dữ liệu

Dữ liệu được tổ chức thành các cụm (clusters) tương ứng với các domain nghiệp vụ:

1.  **Module Sản phẩm**: `product`, `category`, `attribute`, `tag`, `review`.
2.  **Module Đơn hàng**: `cart`, `order`, `order_item`, `cart_item`, `address_order`.
3.  **Module Người dùng**: `user`, `operator`, `bank_accounts`.
4.  **Module Tiếp thị & Vận hành**: `blogs`, `promotions`, `branch`, `notification`.

---

> [!NOTE]
> Hệ thống sử dụng **Flyway** để quản lý các phiên bản migration mã nguồn SQL, đảm bảo tính đồng bộ giữa các môi trường phát triển (Dev, Staging, Production).

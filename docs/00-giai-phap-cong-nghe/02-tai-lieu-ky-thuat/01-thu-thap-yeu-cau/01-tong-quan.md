---
title: Tổng quan Dự án
description: Tầm nhìn, mục tiêu và bối cảnh kinh doanh của dự án Nest Store.
---

# Tổng quan Dự án Nest Store

Nest Store là một nền tảng thương mại điện tử (E-commerce) thế hệ mới, được thiết kế để giải quyết các bài toán về hiệu năng, độ tin cậy và khả năng mở rộng trong quản lý bán hàng đa kênh.

## 1. Tầm nhìn Sản phẩm (Product Vision)

Xây dựng một hệ thống E-commerce hiện đại, cho phép các doanh nghiệp vận hành quy trình bán hàng khép kín từ lúc khách hàng tìm kiếm sản phẩm đến khi đơn hàng được giao thành công. Hệ thống tập trung vào:

- **Trải nghiệm người dùng:** Tốc độ phản hồi nhanh và giao diện tinh tế.
- **Độ tin cậy:** Đảm bảo tính nhất quán của dữ liệu kho hàng và trạng thái đơn hàng.
- **Tính linh hoạt:** Dễ dàng tích hợp các phương thức thanh toán và đơn vị vận chuyển mới.

## 2. Các Module Chính

Hệ thống được thiết kế theo mô hình **Modular Monolith**, bao gồm các module chức năng chính:

1.  **Sản phẩm (Product Management):** Quản lý danh mục, thuộc tính động, tồn kho và đánh giá sản phẩm.
2.  **Đơn hàng (Order Management):** Xử lý luồng đặt hàng, giỏ hàng và lịch sử giao dịch.
3.  **Người dùng (User Management):** Quản lý tài khoản, phân quyền (Admin/Vendor/Customer) và thông tin liên hệ.
4.  **Bán hàng & Tiếp thị (Marketing Content):** Quản lý blog bài viết và các chương trình khuyến mãi/giảm giá.
5.  **Chi nhánh (Branch Management):** Quản lý mạng lưới kho hàng và nhân viên vận hành tại chỗ.
6.  **Thông báo (System Notification):** Hệ thống gửi thông báo đa kênh và đa ngôn ngữ (I18n).

## 3. Đối tượng sử dụng

- **Khách hàng:** Tìm kiếm, mua sắm và theo dõi trạng thái đơn hàng.
- **Chủ cửa hàng/Vendor:** Quản lý gian hàng, sản phẩm và xử lý đơn hàng của mình.
- **Quản trị viên (Admin):** Vận hành hệ thống toàn diện, quản lý người dùng và cấu hình hệ thống.
- **Nhân viên vận hành (Operator):** Xử lý các tác vụ kho bãi và hỗ trợ kỹ thuật tại các chi nhánh.

---

> [!NOTE]
> Tài liệu này được biên soạn dựa trên cấu trúc database thực tế và stack công nghệ hiện đại (Java/Spring/Postgres/Temporal).

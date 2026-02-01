---
title: Người dùng và Bảo mật
description: Thiết kế hệ thống định danh, vai trò và cơ chế bảo mật.
---

# Người dùng và Bảo mật

Hệ thống Nest Store áp dụng các tiêu chuẩn bảo mật hiện đại để bảo vệ dữ liệu người dùng và kiểm soát truy cập tài nguyên hệ thống.

## 1. Mô hình Người dùng (User Model)

Hệ thống phân tách rõ ràng giữa người dùng cuối (Customer/Vendor) và nhân viên vận hành hệ thống (Operator).

### Thành phần chính:

- **Tài khoản (User):** Lưu trữ thông tin định danh cốt lõi (Email, Họ tên, Password).
- **Thông tin tài chính (Bank Account):** Quản lý thông tin thanh toán và nhận tiền (đặc biệt quan trọng cho Vendor).
- **Địa chỉ (Address Order):** Lưu trữ lịch sử địa chỉ giao hàng để tối ưu quy trình checkout.
- **Nhân viên (Operator):** Đại diện cho các tài khoản nội bộ có quyền quản trị hoặc vận hành chi nhánh.

## 2. Xác thực (Authentication)

Hệ thống sử dụng cơ chế **Stateless Authentication** dựa trên tiêu chuẩn **OAuth2** và **JWT (JSON Web Token)**:

- **Flow:** User đăng nhập -> Backend xác thực -> Trả về Access Token & Refresh Token.
- **Resource Server:** Các module backend hoạt động như một Resource Server, kiểm tra tính hợp lệ của JWT trong mỗi yêu cầu.
- **Bảo mật Passwords:** Sử dụng thuật toán `BCrypt` để hashing mật khẩu trước khi lưu vào database.

## 3. Phân quyền (Authorization)

Hệ thống sử dụng mô hình **RBAC (Role-Based Access Control)** kết hợp với **Casbin** để quản lý quyền truy cập động.

### Casbin Integration:

- **Policy Management:** Các chính sách (Access Control List) được lưu trữ và quản lý tập trung, cho phép thay đổi quyền hạn người dùng mà không cần thay đổi source code.
- **Hierarchy:** Hỗ trợ phân quyền phân cấp (ví dụ: Admin có tất cả quyền của Manager, Manager có quyền của Operator).

## 4. Bảo mật dữ liệu

- **Liên kết UUID:** Không sử dụng Long ID tăng dần để tránh lộ thông tin quy mô hệ thống (Insecure Direct Object Reference - IDOR).
- **HTTPS/TLS:** Toàn bộ kết nối giữa Frontend và Backend đều được mã hóa.
- **CORS:** Cấu hình nghiêm ngặt chỉ chấp nhận yêu cầu từ các domain được phép.

---

> [!IMPORTANT]
> Toàn bộ các API yêu cầu xác thực đều phải truyền `Authorization: Bearer <token>` trong Header của Request.

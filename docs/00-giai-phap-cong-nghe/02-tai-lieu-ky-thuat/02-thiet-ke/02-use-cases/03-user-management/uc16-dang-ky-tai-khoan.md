---
title: "UC16 - Đăng ký tài khoản mới"
description: Mô tả kịch bản khách hàng tham gia hệ thống.
---

# UC16 - Đăng ký tài khoản mới

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng vãng lai tạo tài khoản mới trên hệ thống Nest Store bằng địa chỉ Email để hưởng các ưu đãi thành viên và thực hiện mua sắm.

## 2. Tiền xử lý

- Người dùng chưa có tài khoản hoặc sử dụng email chưa tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/register`
- **Authentication**: Không bắt buộc (Công khai).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `email` | string | Địa chỉ email người dùng | Có |
  | `password` | string | Mật khẩu (độ dài > 8 ký tự) | Có |
  | `firstName` | string | Tên | Có |
  | `lastName` | string | Họ | Có |
  | `mobile` | string | Số điện thoại | Có |

## 5. Hậu xử lý

- Kiểm tra tính duy nhất của `email` trong bảng `user`.
- Mã hóa mật khẩu bằng thuật toán **BCrypt**.
- Tạo bản ghi mới trong bảng `user` với `activate = 0`.
- Tạo một giỏ hàng trống (`uuid_cart`) mặc định cho người dùng.
- Gửi email xác thực tài khoản.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created`
- **JSON mẫu**:

```json
{
  "status": 201,
  "message": "Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt.",
  "data": {
    "uuid_user": "u-new-123",
    "email": "customer@example.com"
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Email sai định dạng hoặc mật khẩu quá yếu.
  - `409 Conflict`: Email đã được đăng ký trước đó.

---

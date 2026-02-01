---
sidebar_position: 5
title: UC05 - Đăng nhập hệ thống
description: Mô tả chi tiết quy trình xác thực người dùng và cấp phát Token.
---

# UC05 - Đăng nhập hệ thống

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng (Khách hàng, Admin, Operator) truy cập vào hệ thống bằng tài khoản đã đăng ký (Email/Password) để nhận Access Token.

## 2. Tiền xử lý

- Người dùng đã có tài khoản và đã được kích hoạt (`activate = 1`).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/login`
- **Authentication**: Không bắt buộc.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `email` | string | Email đăng nhập | Có |
  | `password` | string | Mật khẩu | Có |

## 5. Hậu xử lý

- Kiểm tra email tồn tại.
- So khớp mật khẩu (BCrypt).
- Kiểm tra trạng thái kích hoạt.
- Tạo JWT Access Token và Refresh Token.
- Lưu Session vào Redis (nếu cần).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "udih...",
    "expiresIn": 3600,
    "user": {
      "uuid_user": "u-123",
      "fullName": "Nguyen Van A",
      "role": "USER"
    }
  }
}
```

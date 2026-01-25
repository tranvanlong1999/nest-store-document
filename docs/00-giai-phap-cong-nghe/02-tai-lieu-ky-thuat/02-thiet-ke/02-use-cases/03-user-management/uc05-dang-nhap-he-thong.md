---
title: UC05 - Đăng nhập tài khoản
description: Mô tả kịch bản xác thực người dùng trên hệ thống.
---

# UC05 - Đăng nhập tài khoản

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng (Khách hàng, Vendor, Quản trị viên) thực hiện xác thực để truy cập các tính năng bị hạn chế của hệ thống Nest Store.

## 2. Tiền xử lý

- Người dùng đã có tài khoản được kích hoạt trên hệ thống.
- Thiết bị của người dùng có kết nối Internet ổn định.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/login`
- **Authentication**: Không (Công khai).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

| Trường     | Kiểu dữ liệu | Mô tả           | Bắt buộc |
| :--------- | :----------- | :-------------- | :------- |
| `email`    | string       | Email đăng nhập | Có       |
| `password` | string       | Mật khẩu (Raw)  | Có       |

## 5. Hậu xử lý

- Hệ thống tìm kiếm email trong bảng `user`.
- Kiểm tra trạng thái `activate` và so khớp mật khẩu bằng `BCrypt`.
- Nếu chính xác:
  - Tạo JWT Access Token & Refresh Token.
  - Cập nhật thời gian `last_login`.
- Ghi log lịch sử đăng nhập để phục vụ bảo mật.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T10:20:00Z",
  "status": 200,
  "message": "Đăng nhập thành công",
  "data": {
    "accessToken": "ey JhbG...",
    "refreshToken": "ey JhbG...",
    "user": {
      "uuid_user": "u-001",
      "firstName": "Long",
      "lastName": "Trần",
      "email": "long@nest.com",
      "roles": ["CUSTOMER"]
    }
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Email hoặc mật khẩu không đúng định dạng.
  - `401 Unauthorized`: Sai Email hoặc Mật khẩu.
  - `403 Forbidden`: Tài khoản chưa được kích hoạt (`activate=0`) hoặc bị khóa.
  - `500 Internal Server Error`: Lỗi không xác định từ phía server.

---

> [!CAUTION]
> Nếu đăng nhập sai quá 5 lần, tài khoản sẽ bị khóa tạm thời trong 30 phút để bảo vệ.

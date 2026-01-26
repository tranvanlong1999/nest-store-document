---
sidebar_position: 9
title: "UC09 - Đăng ký nhận thông báo"
description: Mô tả kịch bản người dùng đăng ký nhận các bản tin hoặc cảnh báo từ hệ thống.
---

# UC09 - Đăng ký nhận thông báo

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng đăng ký nhận các thông báo về trạng thái đơn hàng, tin tức hoặc khuyến mãi mới thông qua Email hoặc In-app notification.

## 2. Tiền xử lý

- Người dùng đã đăng nhập (đối với thông báo cá nhân hóa).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/notifications/subscribe`
- **Authentication**: JWT Token hợp lệ.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Trường | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `type` | string | Loại thông báo (ORDER, PROMO, SYSTEM) | Có |
  | `channel` | string | Kênh nhận (EMAIL, APP) | Có |

## 5. Hậu xử lý

- Kiểm tra tài khoản trong bảng `user`.
- Lưu cấu hình vào bảng `notification`.
- Gửi tin nhắn xác nhận đăng ký thành công qua Kafka.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T11:30:00Z",
  "status": 200,
  "message": "Đăng ký nhận thông báo thành công"
}
```

- **Trường hợp lỗi**:
  - `401 Unauthorized`: Token không hợp lệ.
  - `400 Bad Request`: Loại hoặc kênh thông báo không hỗ trợ.

---

> [!NOTE]
> Hệ thống sử dụng Kafka để xử lý việc gửi thông báo bất đồng bộ, không gây nghẽn tiến trình của người dùng.


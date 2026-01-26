---
sidebar_position: 15
title: "UC15 - Quản lý Cấu hình Ngôn ngữ (Admin)"
description: Kịch bản quản trị hệ thống đa ngôn ngữ (I18n).
---

# UC15 - Quản lý Cấu hình Ngôn ngữ (Admin)

## 1. Mô tả yêu cầu chức năng

Cho phép Quản trị viên cập nhật các chuỗi ký tự hiển thị (labels), thông báo lỗi hoặc nội dung Email trên hệ thống cho nhiều ngôn ngữ khác nhau (Tiếng Việt, Tiếng Anh).

## 2. Tiền xử lý

- Đăng nhập quyền `ADMIN`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` / `PATCH`
- **URL**: `/api/v1/admin/messages`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `key` | string | Mã tham chiếu duy nhất (ví dụ: `error.not_found`) | Có |
  | `locale` | string | Mã ngôn ngữ (`vi`, `en`) | Có |
  | `content` | string | Nội dung hiển thị thực tế | Có |

## 5. Hậu xử lý

- Hệ thống cập nhật bảng `message`.
- Nếu dùng cơ chế Cache (Redis), hệ thống sẽ thực hiện `evict cache` theo key tương ứng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "message": "Cấu hình ngôn ngữ đã được cập nhật",
  "data": {
    "key": "welcome.msg",
    "locale": "vi",
    "content": "Chào mừng bạn đến với Nest Store"
  }
}
```

---

> [!NOTE]
> Bảng này đóng vai trò là xương sống cho việc bản địa hóa (localization) toàn diện ứng dụng mà không cần thay đổi mã nguồn.


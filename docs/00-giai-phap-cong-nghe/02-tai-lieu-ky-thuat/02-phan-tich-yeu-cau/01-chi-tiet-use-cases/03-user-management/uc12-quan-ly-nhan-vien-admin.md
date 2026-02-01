---
title: "UC12 - Quản lý Nhân viên (Admin)"
description: Kịch bản quản trị viên thiết lập định danh cho nhân viên vận hành.
---

# UC12 - Quản lý Nhân viên (Admin)

## 1. Mô tả yêu cầu chức năng

Quản trị viên hệ thống định nghĩa danh sách các nhân viên (Operator) được phép truy cập vào các công cụ quản trị hoặc quản lý chi nhánh.

## 2. Tiền xử lý

- Đăng nhập quyền `ADMIN`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/operators`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `email` | string | Email công việc của nhân viên | Có |

## 5. Hậu xử lý

- Kiểm tra tính hợp lệ của email.
- Thêm bản ghi vào bảng `operator`.
- Gửi mail mời nhận quyền (`invitation email`).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created`
- **JSON mẫu**:

```json
{
  "status": 201,
  "message": "Đã thêm nhân viên vận hành mới",
  "data": {
    "uuid_operator": "op-555",
    "email": "staff@nest-store.com"
  }
}
```

- **Trường hợp lỗi**:
  - `409 Conflict`: Email nhân viên đã tồn tại trong danh sách.

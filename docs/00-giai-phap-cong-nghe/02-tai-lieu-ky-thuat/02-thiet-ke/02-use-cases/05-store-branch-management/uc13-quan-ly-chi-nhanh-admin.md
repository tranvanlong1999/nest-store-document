---
sidebar_position: 13
title: "UC13 - Quản lý Chi nhánh (Admin)"
description: Kịch bản quản lý các địa điểm kinh doanh vật lý của hệ thống.
---

# UC13 - Quản lý Chi nhánh (Admin)

## 1. Mô tả yêu cầu chức năng

Cho phép Quản trị viên thiết lập và quản lý các chi nhánh (Branch) của Nest Store. Mỗi chi nhánh sẽ được gắn với một người quản lý cụ thể.

## 2. Tiền xử lý

- Đăng nhập quyền `ADMIN`.
- Người chịu trách nhiệm quản lý đã có tài khoản `user` trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` / `PATCH`
- **URL**: `/api/v1/admin/branches`
- **Authentication**: JWT Token (Admin Privilege).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `name` | string | Tên chi nhánh | Có |
  | `uuidUser` | string | ID của người quản lý chi nhánh | Có |

## 5. Hậu xử lý

- Kiểm tra `uuid_user` có tồn tại trong bảng `user`.
- Lưu thông tin vào bảng `branch`.
- Tự động gắn mác `vendor = 1` cho người được chỉ định quản lý nếu chưa có.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "data": {
    "uuid_branch": "br-111",
    "name": "Flagship Store Hanoi",
    "managerEmail": "manager@nest.com"
  }
}
```

---

> [!IMPORTANT]
> Một người dùng (`uuid_user`) chỉ được quản lý duy nhất một chi nhánh tại một thời điểm (Unique Constraint trên bảng `branch`).


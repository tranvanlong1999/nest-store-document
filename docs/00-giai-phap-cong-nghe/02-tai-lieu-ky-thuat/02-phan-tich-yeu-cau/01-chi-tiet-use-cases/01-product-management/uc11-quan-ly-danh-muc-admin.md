---
sidebar_position: 11
title: "UC11 - Quản lý Danh mục (Admin)"
description: Kịch bản quản trị viên thiết lập cây danh mục sản phẩm.
---

# UC11 - Quản lý Danh mục (Admin)

## 1. Mô tả yêu cầu chức năng

Cho phép Quản trị viên xây dựng cấu trúc danh mục sản phẩm (Category Tree) để phân loại hàng hóa trên website.

## 2. Tiền xử lý

- Đăng nhập với quyền `ADMIN`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` / `DELETE`
- **URL**: `/api/v1/admin/categories`
- **Authentication**: JWT Token (Admin Role).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `title` | string | Tên danh mục (ví dụ: Điện tử) | Có |
  | `metaTitle` | string | Tiêu đề SEO | Không |
  | `slug` | string | Đường dẫn URL | Có |
  | `parentId` | string | ID danh mục cha (nếu có) | Không |

## 5. Hậu xử lý

- Hệ thống lưu vào bảng `category`.
- Xóa cache danh mục để cập nhật giao diện người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "data": {
    "uuid_category": "cat-001",
    "title": "Thời trang Nam"
  }
}
```

---

> [!CAUTION]
> Khi xóa một danh mục, hệ thống cần kiểm tra xem có sản phẩm nào đang thuộc danh mục đó không (Bảng `product_category`).

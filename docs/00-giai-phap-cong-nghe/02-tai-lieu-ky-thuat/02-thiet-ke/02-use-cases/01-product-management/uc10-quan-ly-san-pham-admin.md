---
title: "UC10 - Thêm/Sửa sản phẩm (Admin)"
description: Kịch bản quản trị viên quản lý danh sách sản phẩm và kho hàng.
---

# UC10 - Thêm/Sửa sản phẩm (Admin)

## 1. Mô tả yêu cầu chức năng

Cho phép Quản trị viên (Admin) hoặc nhân viên có quyền tạo mới sản phẩm hoặc cập nhật thông tin sản phẩm hiện có (giá, số lượng, SKU, mô tả).

## 2. Tiền xử lý

- Đăng nhập với tài khoản có quyền `ADMIN`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` (Tạo mới) / `PUT` (Cập nhật)
- **URL**: `/api/v1/admin/products`
- **Authentication**: JWT Token (Admin Role).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Trường | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `title` | string | Tên sản phẩm | Có |
  | `sku` | string | Mã kho hàng duy nhất | Có |
  | `price` | double | Giá bán | Có |
  | `quantity` | integer | Số lượng nhập kho | Có |
  | `uuid_branch` | string | ID chi nhánh quản lý | Có |
  | `summary` | text | Mô tả ngắn | Không |

## 5. Hậu xử lý

- Kiểm tra tính duy nhất của `sku` trong bảng `product`.
- Lưu bản ghi mới hoặc cập nhật bản ghi cũ.
- Tự động sinh `slug` từ `title` nếu tạo mới.
- Ghi log lịch sử thay đổi giá và tồn kho.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` / `200 OK`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T12:00:00Z",
  "status": 200,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "uuid_product": "p-999",
    "sku": "NEST-001",
    "updatedDate": "2024-11-20T12:00:00Z"
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: SKU đã tồn tại hoặc dữ liệu thiếu.
  - `403 Forbidden`: Tài khoản không có quyền Admin.

---

> [!IMPORTANT]
> Mọi thay đổi về số lượng (`quantity`) sẽ được đồng bộ ngay lập tức với hệ thống tồn kho thực tế.

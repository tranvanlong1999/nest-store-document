---
sidebar_position: 1
title: UC01 - Xem danh sách sản phẩm
description: Mô tả chi tiết kịch bản người dùng xem danh sách sản phẩm trên hệ thống.
---

# UC01 - Xem danh sách sản phẩm

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng xem danh sách các sản phẩm đang được bày bán trên hệ thống. Hỗ trợ phân trang, tìm kiếm theo tên và lọc cơ bản.

## 2. Tiền xử lý

- Không yêu cầu đăng nhập.
- Sản phẩm hiển thị phải có trạng thái `active` hoặc `published`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/products`
- **Authentication**: Không bắt buộc.

## 4. Yêu cầu đầu vào

- **Query Params**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `page` | integer | Số trang hiện tại (mặc định 0) | Không |
  | `size` | integer | Số lượng bản ghi mỗi trang (mặc định 20) | Không |
  | `q` | string | Từ khóa tìm kiếm theo tên sản phẩm | Không |

## 5. Hậu xử lý

- Hệ thống truy vấn cơ sở dữ liệu bảng `product`.
- Áp dụng các điều kiện lọc `deleted = false`, `status = active`.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "timestamp": "2024-11-20T10:00:00Z",
  "status": 200,
  "data": {
    "content": [
      {
        "uuid_product": "p-001",
        "title": "Sản phẩm Demo 1",
        "price": 100000,
        "thumbnail": "img/p1.jpg"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  }
}
```

- **Trường hợp lỗi**:
  - `500 Internal Server Error`: Lỗi kết nối CSDL.

---

> [!TIP]
> Sử dụng tham số `q` để tìm kiếm nhanh theo tiêu đề sản phẩm (Title).

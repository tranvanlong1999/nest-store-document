---
title: "UC08 - Xem danh sách chi nhánh"
description: Mô tả kịch bản tìm kiếm cửa hàng/chi nhánh gần nhất.
---

# UC08 - Xem danh sách chi nhánh

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng tra cứu thông tin về các cửa hàng vật lý hoặc chi nhánh của hệ thống để thực hiện mua sắm tại chỗ hoặc chọn nơi giao hàng gần nhất.

## 2. Tiền xử lý

- Không yêu cầu đăng nhập.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/branches`
- **Authentication**: Không bắt buộc.

## 4. Yêu cầu đầu vào

- **Query Params**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `name` | string | Tìm kiếm theo tên chi nhánh | Không |

## 5. Hậu xử lý

- Truy vấn bảng `branch`.
- Lấy thông tin người quản lý (`uuid_user`) để hiển thị thông tin liên hệ.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T11:20:00Z",
  "data": [
    {
      "uuid_branch": "br-001",
      "name": "Nest Store - Quận 1",
      "manager": "Nguyễn Văn B",
      "createdDate": "2024-01-01"
    }
  ]
}
```

- **Trường hợp lỗi**:
  - `500 Internal Server Error`: Lỗi kết nối server.

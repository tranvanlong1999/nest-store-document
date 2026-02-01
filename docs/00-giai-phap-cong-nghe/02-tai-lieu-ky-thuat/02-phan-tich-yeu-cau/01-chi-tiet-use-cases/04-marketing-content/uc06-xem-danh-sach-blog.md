---
title: "UC06 - Xem danh sách bài viết blog"
description: Mô tả kịch bản người dùng xem các tin tức và bài viết tiếp thị.
---

# UC06 - Xem danh sách bài viết blog

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng xem danh sách các bài viết, tin tức hoặc hướng dẫn mua sắm trên hệ thống. Hệ thống hỗ trợ tìm kiếm theo tiêu đề và lọc theo thẻ (tags).

## 2. Tiền xử lý

- Không yêu cầu đăng nhập.
- Bài viết phải ở trạng thái đã xuất bản.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/blogs`
- **Authentication**: Không bắt buộc.

## 4. Yêu cầu đầu vào

- **Query Params**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `page` | integer | Trang hiện tại | Không |
  | `tag` | string | Lọc theo thẻ bài viết | Không |
  | `search` | string | Tìm kiếm theo tiêu đề bài viết | Không |

## 5. Hậu xử lý

- Truy vấn bảng `blogs` dựa trên các điều kiện lọc.
- Trả về danh sách tóm tắt (không bao gồm nội dung body dài).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T11:00:00Z",
  "data": {
    "content": [
      {
        "uuid_blog": "b-001",
        "title": "Mẹo phối đồ thu đông 2024",
        "description": "Hướng dẫn cách phối đồ phong cách...",
        "tags": "Fashion, Winter",
        "createdAt": "2024-11-15T08:00:00Z"
      }
    ]
  }
}
```

- **Trường hợp lỗi**:
  - `500 Internal Server Error`: Lỗi kết nối database.

---

> [!TIP]
> Sử dụng tham số `tag` để tìm kiếm các bài viết cùng chủ đề.

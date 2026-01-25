---
title: "UC14 - Soạn thảo bài viết Blog (Admin)"
description: Kịch bản quản trị viên quản lý nội dung tiếp thị trên website.
---

# UC14 - Soạn thảo bài viết Blog (Admin)

## 1. Mô tả yêu cầu chức năng

Cho phép Quản trị viên nội dung soạn thảo, đăng tải các bài viết Tin tức, Cẩm nang mua sắm hoặc Chương trình khuyến mãi lên hệ thống blog.

## 2. Tiền xử lý

- Đăng nhập quyền `ADMIN` hoặc `OPERATOR` (với quyền content).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` / `PUT`
- **URL**: `/api/v1/admin/blogs`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `title` | string | Tiêu đề bài viết | Có |
  | `description` | text | Nội dung chi tiết (HTML/Markdown) | Có |
  | `tags` | string | Các nhãn phân loại bài viết | Không |

## 5. Hậu xử lý

- Lưu thông tin vào bảng `blogs`.
- Hệ thống tự động ghi lại `created_at` và `updated_at`.
- Phân tích `tags` để cập nhật bảng `tag` nếu xuất hiện nhãn mới.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "message": "Đã xuất bản bài viết",
  "data": {
    "uuid_blog": "blog-abc",
    "title": "Mẹo vặt gia đình"
  }
}
```

---

> [!TIP]
> Sử dụng các thẻ `tags` liên quan đến sản phẩm để tăng tỷ lệ chuyển đổi khi khách hàng đọc tin tức.

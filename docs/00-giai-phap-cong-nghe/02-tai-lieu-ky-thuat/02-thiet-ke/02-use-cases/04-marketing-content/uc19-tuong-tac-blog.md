---
sidebar_position: 19
title: "UC19 - Tương tác bài viết Blog"
description: Mô tả kịch bản người dùng bình luận hoặc thích nội dung marketing.
---

# UC19 - Tương tác bài viết Blog

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng tham gia thảo luận về các bài viết blog bằng cách để lại bình luận hoặc bày tỏ sự quan tâm qua nút "Thích" (Like).

## 2. Tiền xử lý

- Người dùng đã đăng nhập để gửi bình luận.
- Khách vãng lai chỉ có quyền đọc.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/blogs/{uuid}/review`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `description` | text | Nội dung bình luận | Có |
  | `isLiked` | boolean | Trạng thái Thích (True/False) | Không |
  | `parentId` | string | ID bình luận gốc (nếu là phản hồi) | Không |

## 5. Hậu xử lý

- Lưu thông tin vào bảng `blog_reviews`.
- Cập nhật `updated_at` cho bảng `blogs` (tùy chọn logic ranking).
- Thông báo cho tác giả bài viết nếu có bình luận mới.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "data": {
    "uuid_blog_review": "brev-001",
    "isLiked": true
  }
}
```

---

> [!TIP]
> Hệ thống hỗ trợ cây bình luận vô hạn thông qua quan hệ `uuid_parent_blog_review`.


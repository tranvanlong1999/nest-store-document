---
title: "UC18 - Đánh giá và Phản hồi"
description: Mô tả kịch bản người dùng gửi đánh giá cho sản phẩm hoặc gian hàng.
---

# UC18 - Đánh giá và Phản hồi

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng đã mua hàng thực hiện gửi nhận xét, đánh giá số sao (Rating) và đăng tải hình ảnh thực tế cho Sản phẩm hoặc Nhà cung cấp (Chi nhánh).

## 2. Tiền xử lý

- Người dùng đã hoàn tất đơn hàng chứa sản phẩm cần đánh giá (`status = PAID` hoặc `DELIVERED`).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/reviews/product` hoặc `/api/v1/reviews/vendor`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `targetId` | string | ID Sản phẩm hoặc ID Nhà cung cấp | Có |
  | `rating` | integer | Số sao đánh giá (1-5) | Có |
  | `title` | string | Tiêu đề đánh giá | Không |
  | `comment` | text | Nội dung chi tiết | Có |

## 5. Hậu xử lý

- Lưu thông tin vào bảng `product_review` hoặc `vendor_review`.
- Hệ thống đặt `published = 0` (Chế độ kiểm duyệt) theo cấu hình.
- Tính toán lại điểm số trung bình (Average Rating) cho sản phẩm/nhà cung cấp.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created`
- **JSON mẫu**:

```json
{
  "status": 201,
  "message": "Cảm ơn bạn đã gửi đánh giá!",
  "data": {
    "uuid_product_review": "rev-888",
    "rating": 5
  }
}
```

---

> [!NOTE]
> Hệ thống hỗ trợ đánh giá phân cấp (`uuid_parent_product_review`), cho phép chủ cửa hàng phản hồi lại nhận xét của khách hàng.

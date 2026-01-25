---
title: UC02 - Xem chi tiết sản phẩm
description: Mô tả chi tiết kịch bản người dùng xem thông tin chi tiết của một sản phẩm.
---

# UC02 - Xem chi tiết sản phẩm

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng xem đầy đủ thông tin của một sản phẩm cụ thể, bao gồm mô tả chi tiết, các thuộc tính động (màu sắc, kích cỡ), hình ảnh và đánh giá từ người dùng khác.

## 2. Tiền xử lý

- Truy nhập công khai, không yêu cầu đăng nhập.
- Sản phẩm phải ở trạng thái được phép hiển thị (`published`).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/products/{slug}`
- **Authentication**: Không bắt buộc.

## 4. Yêu cầu đầu vào

- **Path Variable**: `{slug}` - Đường dẫn thân thiện của sản phẩm.

## 5. Hậu xử lý

- Hệ thống truy xuất bảng `product` theo `slug`.
- Lấy thông tin các bảng liên quan: `attribute`, `product_attribute`, `category`, `product_review`.
- Tăng lượt xem cho sản phẩm (nếu có logic tracking).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **Body**: Đối tượng JSON chứa toàn bộ dữ liệu sản phẩm.

```json
{
  "timestamp": "2024-11-20T10:05:00Z",
  "status": 200,
  "message": "Success",
  "data": {
    "uuid_product": "p-12345",
    "title": "Sản phẩm A",
    "description": "Mô tả chi tiết về sản phẩm...",
    "price": 500000,
    "attributes": [
      { "key": "Màu sắc", "value": "Đỏ" },
      { "key": "Kích cỡ", "value": "XL" }
    ],
    "reviews": [
      { "user": "Nguyễn Văn A", "rating": 5, "comment": "Sản phẩm rất tốt!" }
    ]
  }
}
```

- **Trường hợp lỗi**:
  - `404 Not Found`: Nếu không tìm thấy sản phẩm với `slug` tương ứng.
  - `500 Internal Server Error`: Lỗi không xác định từ phía server.

---

> [!NOTE]
> Thông tin giá và tồn kho được lấy thời gian thực từ cơ sở dữ liệu.

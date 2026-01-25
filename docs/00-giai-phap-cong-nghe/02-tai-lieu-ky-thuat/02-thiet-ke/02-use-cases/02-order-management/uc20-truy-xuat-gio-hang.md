---
title: "UC20 - Truy xuất Giỏ hàng"
description: Mô tả kịch bản đồng bộ hóa giỏ hàng của người dùng trên nhiều phiên truy cập.
---

# UC20 - Truy xuất Giỏ hàng

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng xem lại toàn bộ các sản phẩm đã thêm vào giỏ hàng từ trước đó, đảm bảo tính nhất quán giữa các thiết bị sau khi đăng nhập.

## 2. Tiền xử lý

- Người dùng đang có phiên truy cập (Session) hoặc đã đăng nhập.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/cart`
- **Authentication**: JWT Token hoặc Session ID.

## 4. Yêu cầu đầu vào

- **Headers**: `Authorization` (nếu đã đăng nhập).

## 5. Hậu xử lý

- Hệ thống truy vấn bảng `cart` và `cart_item`.
- Tính toán lại giá trị của giỏ hàng dựa trên giá sản phẩm mới nhất từ bảng `product`.
- Trả về danh sách chi tiết các mặt hàng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "timestamp": "2024-11-20T11:40:00Z",
  "data": {
    "uuid_cart": "c-123",
    "items": [
      {
        "productId": "p-1",
        "title": "Áo Thun",
        "quantity": 2,
        "price": 150000
      }
    ],
    "subtotal": 300000
  }
}
```

---

> [!NOTE]
> Hệ thống sử dụng bảng `cart` làm trung tâm lưu trữ lâu dài (Persistence), giúp người dùng không bị mất dữ liệu khi tắt trình duyệt.

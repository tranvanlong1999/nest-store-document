---
sidebar_position: 4
title: UC04 - Tạo đơn hàng
description: Mô tả kịch bản chuyển đổi giỏ hàng thành đơn hàng chính thức.
---

# UC04 - Tạo đơn hàng

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng chuyển đổi các mặt hàng trong giỏ hàng thành một đơn hàng mua sắm chính thức. Hệ thống thực hiện chốt giá, tính thuế, phí vận chuyển và cập nhật tồn kho.

## 2. Tiền xử lý

- Người dùng đã đăng nhập hoặc đã xác thực định danh thanh toán.
- Giỏ hàng có ít nhất một sản phẩm.
- Đã cung cấp thông tin địa chỉ giao hàng (`address_order`).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/orders`
- **Authentication**: JWT Token hợp lệ.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

| Trường          | Kiểu dữ liệu | Mô tả                          | Bắt buộc |
| :-------------- | :----------- | :----------------------------- | :------- |
| `cartId`        | string       | ID giỏ hàng cần thanh toán     | Có       |
| `addressId`     | string       | ID địa chỉ giao hàng           | Có       |
| `paymentMethod` | string       | Phương thức (COD, VNPay, v.v.) | Có       |
| `promoCode`     | string       | Mã giảm giá                    | Không    |

## 5. Hậu xử lý

- **Transaction (Postgres)**:
  - Tạo bản ghi trong bảng `order`.
  - Chuyển `cart_item` sang `order_item` (Snapshot giá tại thời điểm mua).
  - Giảm số lượng `quantity` trong bảng `product`.
- **Workflow (Temporal)**:
  - Khởi tạo Workflow quản lý vòng đời đơn hàng.
  - Gửi email xác nhận đơn hàng thành công.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T10:15:00Z",
  "status": 200,
  "message": "Đơn hàng đã được khởi tạo",
  "data": {
    "orderId": "ORD-123456",
    "status": "PENDING",
    "grandTotal": 1550000
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Nếu giỏ hàng trống hoặc thiếu thông tin thanh toán/địa chỉ.
  - `401 Unauthorized`: Nếu JWT Token không hợp lệ hoặc đã hết hạn.
  - `409 Conflict`: Nếu xảy ra tranh chấp tồn kho (sản phẩm vừa được mua hết bởi người khác).
  - `500 Internal Server Error`: Lỗi không xác định từ phía server hoặc lỗi Workflow engine.

---

> [!IMPORTANT]
> Quy trình tạo đơn hàng được xử lý Atomic (Nguyên tử) để đảm bảo không mất dữ liệu hoặc sai lệch tồn kho.


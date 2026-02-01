---
sidebar_position: 3
title: UC03 - Thêm sản phẩm vào giỏ hàng
description: Mô tả kịch bản khách hàng thêm sản phẩm vào giỏ hàng cá nhân.
---

# UC03 - Thêm sản phẩm vào giỏ hàng

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng đang đăng nhập hoặc khách vãng lai thêm các sản phẩm vào giỏ hàng điện tử của mình để chuẩn bị cho quá trình thanh toán. Hệ thống cần kiểm tra tồn kho tại thời điểm thêm.

## 2. Tiền xử lý

- Người dùng đang truy cập hệ thống.
- Sản phẩm có hiệu lực và còn tồn kho (`quantity > 0`).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/cart/items`
- **Authentication**: JWT Token (Nếu đã đăng nhập) hoặc Session ID (Khách vãng lai).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

| Trường      | Kiểu dữ liệu  | Mô tả                    | Bắt buộc         |
| :---------- | :------------ | :----------------------- | :--------------- |
| `productId` | string (UUID) | ID duy nhất của sản phẩm | Có               |
| `quantity`  | integer       | Số lượng thêm vào        | Có (Tối thiểu 1) |

## 5. Hậu xử lý

- Hệ thống kiểm tra bảng `product` để xác thực ID và số lượng tồn kho.
- Kiểm tra giỏ hàng hiện tại:
  - Nếu sản phẩm đã có: Tăng `quantity` trong bảng `cart_item`.
  - Nếu chưa có: Tạo bản ghi mới trong bảng `cart_item`.
- Cập nhật thời gian `updated_date` cho giỏ hàng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created`
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T10:10:00Z",
  "status": 201,
  "message": "Đã thêm vào giỏ hàng",
  "data": {
    "cartId": "c-999",
    "totalItems": 3,
    "subtotal": 1500000
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Nếu sản phẩm không còn đủ tồn kho hoặc số lượng yêu cầu không hợp lệ.
  - `401 Unauthorized`: Nếu yêu cầu chưa được xác thực (đối với giỏ hàng định danh).
  - `404 Not Found`: Nếu không tìm thấy ID sản phẩm.
  - `500 Internal Server Error`: Lỗi không xác định từ phía server.

---

> [!WARNING]
> Nếu `quantity` yêu cầu vượt quá tồn kho, hệ thống trả về mã lỗi `400 Bad Request`.

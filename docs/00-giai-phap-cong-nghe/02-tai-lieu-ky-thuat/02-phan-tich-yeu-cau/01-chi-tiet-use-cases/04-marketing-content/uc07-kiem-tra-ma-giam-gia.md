---
title: "UC07 - Kiểm tra mã giảm giá"
description: Mô tả kịch bản xác thực tính hợp lệ của mã khuyến mãi trước khi áp dụng vào đơn hàng.
---

# UC07 - Kiểm tra mã giảm giá

## 1. Mô tả yêu cầu chức năng

Cho phép người dùng hoặc hệ thống kiểm tra tính hợp lệ của một mã giảm giá (Promo Code) dựa trên thời gian, số lượt sử dụng còn lại và điều kiện đơn hàng.

## 2. Tiền xử lý

- Người dùng đã có ít nhất một sản phẩm trong giỏ hàng.
- Mã giảm giá hiện có trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/promotions/validate`
- **Authentication**: JWT Token (Bắt buộc).

## 4. Yêu cầu đầu vào

- **Query Params**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `code` | string | Mã giảm giá nhập từ người dùng | Có |
  | `amount` | double | Tổng tiền đơn hàng để kiểm tra điều kiện | Có |

## 5. Hậu xử lý

- Truy vấn bảng `promotions` theo `code`.
- Kiểm tra `start_date`, `end_date` và `limit_amount_use`.
- Tính toán số tiền được giảm dựa trên `discount` (phần trăm) hoặc giá trị cố định.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu mã hợp lệ.
- **Body mẫu**:

```json
{
  "timestamp": "2024-11-20T11:10:00Z",
  "status": 200,
  "data": {
    "isValid": true,
    "discountValue": 50000,
    "discountType": "FIXED",
    "message": "Mã giảm giá đã được áp dụng"
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Mã hết hạn hoặc hết số lượt sử dụng.
  - `404 Not Found`: Mã không tồn tại.

---

> [!IMPORTANT]
> Việc trừ số lượt sử dụng thực tế chỉ diễn ra khi đơn hàng được tạo thành công (**UC04**).

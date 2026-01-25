---
title: "UC17 - Quản lý Sổ địa chỉ"
description: Mô tả kịch bản người dùng quản lý các địa điểm nhận hàng.
---

# UC17 - Quản lý Sổ địa chỉ

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng lưu trữ nhiều địa chỉ giao hàng (Nhà riêng, Cơ quan, v.v.) để lựa chọn nhanh chóng trong bước Thanh toán (Checkout).

## 2. Tiền xử lý

- Người dùng đã đăng nhập vào hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` (Thêm) / `GET` (Danh sách) / `DELETE` (Xóa)
- **URL**: `/api/v1/user/addresses`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `mobile` | string | Số điện thoại nhận hàng | Có |
  | `line1` | string | Địa chỉ chi tiết | Có |
  | `city` | string | Thành phố | Có |
  | `province` | string | Tỉnh/Quận/Huyện | Có |

## 5. Hậu xử lý

- Lưu thông tin vào bảng `address_order` và liên kết với `uuid_user`.
- Cập nhật thông tin địa chỉ trong bảng `user` nếu người dùng chọn làm "Địa chỉ mặc định".

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "data": [
    {
      "uuid_address_order": "addr-01",
      "mobile": "0988123456",
      "fullAddress": "Số 1, Phố Huế, Hà Nội"
    }
  ]
}
```

---

> [!TIP]
> Việc quản lý sổ địa chỉ tốt giúp giảm tỷ lệ bỏ rơi giỏ hàng do thao tác nhập liệu phức tạp.

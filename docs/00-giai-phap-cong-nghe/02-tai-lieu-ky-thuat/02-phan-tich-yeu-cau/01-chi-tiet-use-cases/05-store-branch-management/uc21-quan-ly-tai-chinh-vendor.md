---
title: "UC21 - Quản lý Thông tin Tài chính (Vendor)"
description: Kịch bản nhà bán hàng cấu hình tài khoản nhận tiền.
---

# UC21 - Quản lý Thông tin Tài chính (Vendor)

## 1. Mô tả yêu cầu chức năng

Cho phép Nhà bán hàng (Vendor) liên kết các tài khoản ngân hàng để thực hiện đối soát và nhận tiền từ các giao dịch bán hàng trên hệ thống.

## 2. Tiền xử lý

- Người dùng có quyền `VENDOR`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` / `DELETE`
- **URL**: `/api/v1/vendor/bank-accounts`
- **Authentication**: JWT Token.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:
  | Tham số | Kiểu dữ liệu | Mô tả | Bắt buộc |
  | :--- | :--- | :--- | :--- |
  | `name` | string | Tên ngân hàng (ví dụ: Vietcombank) | Có |
  | `type` | string | Loại tài khoản (Chủ thẻ, Doanh nghiệp) | Có |

## 5. Hậu xử lý

- Hệ thống lưu thông tin vào bảng `bank_accounts`.
- Thực hiện xác minh tài khoản (nếu có tích hợp gateway xác thực).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK`
- **JSON mẫu**:

```json
{
  "status": 200,
  "message": "Đã thêm tài khoản ngân hàng",
  "data": {
    "uuid_bank_account": "ba-001",
    "name": "VietinBank"
  }
}
```

---

> [!WARNING]
> Thông tin tài khoản ngân hàng được sử dụng cho toàn bộ các lệnh chuyển tiền định kỳ từ hệ thống tới nhà bán hàng.

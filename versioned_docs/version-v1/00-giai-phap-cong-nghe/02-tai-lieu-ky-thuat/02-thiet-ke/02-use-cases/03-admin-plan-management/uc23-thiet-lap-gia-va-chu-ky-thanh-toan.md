
# UC23: Thiết lập giá và chu kỳ thanh toán

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thiết lập hoặc cập nhật giá và chu kỳ thanh toán cho các gói dịch vụ. Điều này bao gồm việc định nghĩa các mức giá khác nhau cho các chu kỳ thanh toán khác nhau (ví dụ: hàng tháng, hàng quý, hàng năm) và quản lý các tùy chọn thanh toán.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ và thanh toán.
- Gói dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/plans/{planId}/pricing`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `planId` (UUID) - ID của gói dịch vụ cần thiết lập giá.
- **Body (JSON)**:

```json
{
  "pricingOptions": [
    {
      "billingCycle": "MONTHLY",
      "price": 99.99,
      "currency": "USD"
    },
    {
      "billingCycle": "YEARLY",
      "price": 999.99,
      "currency": "USD",
      "discountPercentage": 15
    }
  ]
}
```

- **Constraints**: 
    - `pricingOptions` là một mảng các đối tượng tùy chọn giá.
    - Mỗi đối tượng phải có `billingCycle` hợp lệ (`MONTHLY`, `QUARTERLY`, `YEARLY`), `price` là số không âm, và `currency` là mã tiền tệ hợp lệ (ví dụ: "USD", "VND").
    - `discountPercentage` là tùy chọn, phải là số không âm.

## 5. Hậu xử lý

- Hệ thống xác định gói dịch vụ theo `planId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Cập nhật (thêm/sửa/xóa) các tùy chọn giá và chu kỳ thanh toán cho gói dịch vụ trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình giá của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin gói dịch vụ với các tùy chọn giá đã được cập nhật:

```json
{
  "planId": "uuid-cua-plan",
  "planName": "Premium",
  "pricingOptions": [
    {
      "billingCycle": "MONTHLY",
      "price": 99.99,
      "currency": "USD"
    },
    {
      "billingCycle": "YEARLY",
      "price": 999.99,
      "currency": "USD",
      "discountPercentage": 15
    }
  ],
  "message": "Plan pricing updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy gói dịch vụ với `planId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


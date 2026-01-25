
# UC19: Tạo gói dịch vụ mới

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) tạo một gói dịch vụ mới (ví dụ: Free, Trial, Premium, Enterprise) với các thuộc tính như tên gói, mô tả, giá cả, chu kỳ thanh toán, và các hạn ngạch (quota) mặc định cho từng dịch vụ đi kèm. Điều này giúp hệ thống mở rộng các lựa chọn gói dịch vụ cho người dùng.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/plans`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "planName": "Premium",
  "description": "Gói dịch vụ cao cấp với nhiều tính năng và quota lớn.",
  "price": 99.99,
  "billingCycle": "MONTHLY", // MONTHLY, QUARTERLY, YEARLY
  "features": ["FEATURE_A", "FEATURE_B"],
  "defaultQuotas": [
    {
      "serviceId": "uuid-cua-service-stt",
      "limit": 100000,
      "unit": "seconds"
    },
    {
      "serviceId": "uuid-cua-service-ekyc",
      "limit": 5000,
      "unit": "transactions"
    }
  ]
}
```

- **Constraints**: 
    - `planName` là bắt buộc và phải là duy nhất.
    - `description` là bắt buộc.
    - `price` là bắt buộc và phải là số không âm.
    - `billingCycle` là bắt buộc và phải là một trong các giá trị hợp lệ.
    - `features` là tùy chọn, danh sách các tính năng được bao gồm.
    - `defaultQuotas` là tùy chọn, mỗi đối tượng trong mảng phải có `serviceId` hợp lệ, `limit` dương và `unit` hợp lệ.

## 5. Hậu xử lý

- Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Lưu thông tin gói dịch vụ mới vào cơ sở dữ liệu.
- Ghi log hoạt động tạo gói dịch vụ của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin của gói dịch vụ vừa được tạo:

```json
{
  "planId": "uuid-cua-plan-moi",
  "planName": "Premium",
  "description": "Gói dịch vụ cao cấp với nhiều tính năng và quota lớn.",
  "price": 99.99,
  "billingCycle": "MONTHLY",
  "features": ["FEATURE_A", "FEATURE_B"],
  "defaultQuotas": [
    {
      "serviceId": "uuid-cua-service-stt",
      "limit": 100000,
      "unit": "seconds"
    },
    {
      "serviceId": "uuid-cua-service-ekyc",
      "limit": 5000,
      "unit": "transactions"
    }
  ],
  "createdAt": "2023-07-15T21:00:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `planName` đã tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.



# UC22: Cấu hình quota cho từng gói

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) cấu hình hạn ngạch (quota) sử dụng cho từng dịch vụ trong mỗi gói dịch vụ. Điều này bao gồm việc thiết lập giới hạn số lượng yêu cầu, thời gian sử dụng, hoặc số lượng giao dịch cho các dịch vụ như Speech-to-Text, eKYC, OCR, v.v. Quota giúp định nghĩa giá trị và giới hạn của từng gói dịch vụ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ.
- Gói dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.
- Các dịch vụ được tham chiếu trong quota phải tồn tại.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/plans/{planId}/quotas`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `planId` (UUID) - ID của gói dịch vụ cần cấu hình quota.
- **Body (JSON)**:

```json
{
  "quotas": [
    {
      "serviceId": "uuid-cua-service-stt",
      "limit": 200000,
      "unit": "seconds"
    },
    {
      "serviceId": "uuid-cua-service-ekyc",
      "limit": 10000,
      "unit": "transactions"
    }
  ]
}
```

- **Constraints**: 
    - `quotas` là một mảng các đối tượng quota.
    - Mỗi đối tượng quota phải có `serviceId` hợp lệ, `limit` là số nguyên dương, và `unit` hợp lệ (ví dụ: "seconds", "transactions", "requests").
    - Nếu một `serviceId` không được cung cấp trong danh sách, quota hiện có cho dịch vụ đó trong gói sẽ bị xóa hoặc đặt về 0.

## 5. Hậu xử lý

- Hệ thống xác định gói dịch vụ theo `planId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào và các `serviceId`.
- Cập nhật (thêm/sửa/xóa) các cấu hình quota cho gói dịch vụ trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình quota của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin gói dịch vụ với các quota đã được cập nhật:

```json
{
  "planId": "uuid-cua-plan",
  "planName": "Premium",
  "quotas": [
    {
      "serviceId": "uuid-cua-service-stt",
      "limit": 200000,
      "unit": "seconds"
    },
    {
      "serviceId": "uuid-cua-service-ekyc",
      "limit": 10000,
      "unit": "transactions"
    }
  ],
  "message": "Plan quotas updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `serviceId` không tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy gói dịch vụ với `planId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.



# UC32: Thiết lập quota mặc định cho từng gói

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thiết lập hạn ngạch (quota) mặc định cho từng gói dịch vụ. Khi một người dùng đăng ký hoặc nâng cấp lên một gói dịch vụ, họ sẽ tự động được gán các hạn ngạch này. Điều này giúp tự động hóa việc quản lý tài nguyên và đảm bảo người dùng nhận được đúng quyền lợi của gói dịch vụ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ và quota.
- Gói dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.
- Các dịch vụ được tham chiếu trong quota phải tồn tại.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/plans/{planId}/default-quotas`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `planId` (UUID) - ID của gói dịch vụ cần thiết lập quota mặc định.
- **Body (JSON)**:

```json
{
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
    - `defaultQuotas` là một mảng các đối tượng quota.
    - Mỗi đối tượng quota phải có `serviceId` hợp lệ, `limit` là số nguyên dương, và `unit` hợp lệ (ví dụ: "seconds", "transactions", "requests").
    - Nếu một `serviceId` không được cung cấp trong danh sách, quota mặc định hiện có cho dịch vụ đó trong gói sẽ bị xóa hoặc đặt về 0.

## 5. Hậu xử lý

- Hệ thống xác định gói dịch vụ theo `planId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào và các `serviceId`.
- Cập nhật (thêm/sửa/xóa) các cấu hình quota mặc định cho gói dịch vụ trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình quota mặc định của Admin.
- (Tùy chọn) Kích hoạt việc cập nhật quota cho những người dùng hiện tại đang sử dụng gói này (nếu có chính sách).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin gói dịch vụ với các quota mặc định đã được cập nhật:

```json
{
  "planId": "uuid-cua-plan",
  "planName": "Premium",
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
  "message": "Default quotas for plan updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `serviceId` không tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy gói dịch vụ với `planId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.



# UC20: Cập nhật thông tin gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) cập nhật thông tin của một gói dịch vụ hiện có, bao gồm tên gói, mô tả, giá cả, chu kỳ thanh toán, và các tính năng đi kèm. Điều này giúp Admin điều chỉnh các gói dịch vụ để phù hợp với chiến lược kinh doanh hoặc thay đổi thị trường.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ.
- Gói dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/plans/{planId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `planId` (UUID) - ID của gói dịch vụ cần cập nhật.
- **Body (JSON)**:

```json
{
  "planName": "Premium Plus",
  "description": "Gói dịch vụ cao cấp nhất với hỗ trợ ưu tiên.",
  "price": 149.99,
  "billingCycle": "MONTHLY",
  "features": ["FEATURE_A", "FEATURE_B", "PRIORITY_SUPPORT"]
}
```

- **Constraints**: 
    - Các trường trong body là tùy chọn; chỉ các trường được cung cấp sẽ được cập nhật.
    - `planName` nếu được cung cấp phải là duy nhất.
    - `price` nếu được cung cấp phải là số không âm.
    - `billingCycle` nếu được cung cấp phải là một trong các giá trị hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác định gói dịch vụ theo `planId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào (ví dụ: `planName` không trùng lặp).
- Cập nhật các trường thông tin được cung cấp trong cơ sở dữ liệu.
- Ghi log hoạt động cập nhật gói dịch vụ của Admin.
- (Tùy chọn) Gửi thông báo cho người dùng đang sử dụng gói dịch vụ này về sự thay đổi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin cập nhật của gói dịch vụ:

```json
{
  "planId": "uuid-cua-plan",
  "planName": "Premium Plus",
  "description": "Gói dịch vụ cao cấp nhất với hỗ trợ ưu tiên.",
  "price": 149.99,
  "billingCycle": "MONTHLY",
  "features": ["FEATURE_A", "FEATURE_B", "PRIORITY_SUPPORT"],
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-07-15T21:30:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `planName` đã tồn tại, sai định dạng).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy gói dịch vụ với `planId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


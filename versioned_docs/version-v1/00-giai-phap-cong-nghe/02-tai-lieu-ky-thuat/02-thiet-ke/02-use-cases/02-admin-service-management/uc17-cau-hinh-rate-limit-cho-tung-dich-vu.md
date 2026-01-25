
# UC17: Cấu hình rate limit cho từng dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) cấu hình giới hạn tốc độ (rate limit) cho từng dịch vụ API. Rate limit giúp kiểm soát số lượng yêu cầu mà một người dùng hoặc API Key có thể gửi đến một dịch vụ trong một khoảng thời gian nhất định, ngăn chặn lạm dụng và đảm bảo ổn định hệ thống.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ và cấu hình hệ thống.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.
- Hệ thống API Gateway phải có khả năng áp dụng rate limit.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/services/{serviceId}/rate-limit`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần cấu hình rate limit.
- **Body (JSON)**:

```json
{
  "limit": 100,    // Số lượng yêu cầu tối đa
  "period": "MINUTE" // Khoảng thời gian (SECOND, MINUTE, HOUR, DAY)
}
```

- **Constraints**: 
    - `limit` là bắt buộc và phải là số nguyên dương.
    - `period` là bắt buộc và phải là một trong các giá trị hợp lệ: `SECOND`, `MINUTE`, `HOUR`, `DAY`.

## 5. Hậu xử lý

- Hệ thống xác định dịch vụ theo `serviceId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Lưu cấu hình rate limit vào cơ sở dữ liệu hoặc hệ thống cấu hình tập trung.
- Gửi thông báo đến API Gateway để cập nhật cấu hình rate limit mới.
- Ghi log hoạt động cấu hình rate limit của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận cấu hình rate limit mới của dịch vụ:

```json
{
  "serviceId": "uuid-cua-service",
  "serviceName": "Speech To Text",
  "rateLimit": {
    "limit": 100,
    "period": "MINUTE"
  },
  "message": "Rate limit configured successfully for service."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ với `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.



# UC14: Enable/Disable dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thay đổi trạng thái kích hoạt (enable/disable) của một dịch vụ. Khi một dịch vụ bị vô hiệu hóa (disabled), người dùng cuối sẽ không thể sử dụng dịch vụ đó. Khi dịch vụ được kích hoạt (enabled), người dùng có thể truy cập lại bình thường.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/services/{serviceId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần thay đổi trạng thái.
- **Body (JSON)**:

```json
{
  "isEnabled": true  // Hoặc false
}
```

- **Constraints**: 
    - `isEnabled` phải là một giá trị boolean (`true` hoặc `false`).

## 5. Hậu xử lý

- Hệ thống xác định dịch vụ theo `serviceId`.
- Cập nhật trạng thái `isEnabled` của dịch vụ trong cơ sở dữ liệu.
- Ghi log hoạt động thay đổi trạng thái dịch vụ của Admin.
- (Tùy chọn) Gửi thông báo cho người dùng hoặc developer đang sử dụng dịch vụ về sự thay đổi trạng thái.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái mới của dịch vụ:

```json
{
  "serviceId": "uuid-cua-service",
  "serviceName": "Speech To Text",
  "isEnabled": true, // Trạng thái mới của dịch vụ
  "message": "Service status updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `isEnabled` trong request body không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ với `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


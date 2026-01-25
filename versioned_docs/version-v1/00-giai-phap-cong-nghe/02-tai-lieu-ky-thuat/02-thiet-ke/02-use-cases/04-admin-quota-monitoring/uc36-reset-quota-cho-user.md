
# UC36: Reset quota cho user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) đặt lại (reset) hạn ngạch sử dụng (quota) của một người dùng cụ thể cho một dịch vụ hoặc tất cả các dịch vụ. Việc reset quota có thể được thực hiện định kỳ (ví dụ: đầu mỗi tháng) hoặc theo yêu cầu đặc biệt. Điều này giúp quản lý việc sử dụng tài nguyên và đảm bảo người dùng có thể tiếp tục sử dụng dịch vụ sau khi hạn ngạch của họ đã được tiêu thụ hết.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý quota.
- User với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/users/{userId}/reset-quota`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần reset quota.
- **Body (JSON)**:

```json
{
  "serviceId": "uuid-cua-service-stt" // Tùy chọn: ID của dịch vụ cụ thể cần reset. Nếu không có, reset tất cả dịch vụ.
}
```

- **Constraints**: 
    - `serviceId` nếu được cung cấp phải là ID của một dịch vụ hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId`.
- Nếu `serviceId` được cung cấp:
    - Reset quota sử dụng của người dùng cho dịch vụ cụ thể đó về 0 hoặc về hạn mức mặc định của gói dịch vụ.
- Nếu `serviceId` không được cung cấp:
    - Reset quota sử dụng của người dùng cho tất cả các dịch vụ về 0 hoặc về hạn mức mặc định của gói dịch vụ.
- Ghi log hoạt động reset quota của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận việc reset quota:

```json
{
  "userId": "uuid-cua-user",
  "message": "Quota for user reset successfully."
  // Hoặc: "message": "Quota for user on service Speech To Text reset successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `serviceId` không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


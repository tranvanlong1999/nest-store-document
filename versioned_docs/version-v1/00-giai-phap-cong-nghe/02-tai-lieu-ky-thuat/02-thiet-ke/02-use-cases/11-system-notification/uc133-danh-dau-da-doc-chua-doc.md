
# UC133: Đánh dấu đã đọc/chưa đọc

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đánh dấu các thông báo (notifications) trong ứng dụng là đã đọc hoặc chưa đọc. Điều này giúp người dùng quản lý các thông báo của mình, dễ dàng nhận biết những thông báo mới chưa xem và theo dõi những thông báo quan trọng đã xử lý.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có các thông báo trong danh sách của họ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/notifications/{notificationId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `notificationId` (UUID) - ID của thông báo cần cập nhật trạng thái.
- **Body (JSON)**:

```json
{
  "status": "READ" // Hoặc "UNREAD"
}
```

- **Constraints**: 
    - `status` là bắt buộc và phải là `READ` hoặc `UNREAD`.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `notificationId` có hợp lệ và thông báo đó thuộc về người dùng hiện tại không.
- Cập nhật trạng thái của thông báo trong cơ sở dữ liệu.
- Ghi log hoạt động đánh dấu thông báo.
- (Tùy chọn) Gửi thông báo real-time đến client của người dùng để cập nhật giao diện.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái thông báo đã được cập nhật:

```json
{
  "notificationId": "uuid-cua-notification",
  "status": "READ",
  "message": "Notification status updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu thông báo không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy thông báo với `notificationId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


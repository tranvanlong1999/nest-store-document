
# UC134: Xóa notifications

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng xóa các thông báo (notifications) khỏi danh sách của họ. Điều này giúp người dùng dọn dẹp hộp thư thông báo và chỉ giữ lại những thông báo quan trọng hoặc chưa xử lý.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có các thông báo trong danh sách của họ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/notifications/{notificationId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `notificationId` (UUID) - ID của thông báo cần xóa.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `notificationId` có hợp lệ và thông báo đó thuộc về người dùng hiện tại không.
- Xóa thông báo khỏi cơ sở dữ liệu.
- Ghi log hoạt động xóa thông báo.
- (Tùy chọn) Gửi thông báo real-time đến client của người dùng để cập nhật giao diện.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `204 No Content` nếu thành công.

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu thông báo không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy thông báo với `notificationId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


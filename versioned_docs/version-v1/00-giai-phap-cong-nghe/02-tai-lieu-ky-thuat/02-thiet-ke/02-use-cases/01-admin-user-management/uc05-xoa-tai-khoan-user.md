
# UC05: Xóa tài khoản user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thực hiện xóa mềm (soft delete) một tài khoản người dùng khỏi hệ thống. Việc này sẽ đánh dấu tài khoản là đã bị xóa (thường thông qua trường `deletedAt`), vô hiệu hóa quyền truy cập và các API Key liên quan, nhưng vẫn giữ lại dữ liệu lịch sử để phục vụ mục đích đối soát và khôi phục nếu cần thiết.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng.
- User với ID được cung cấp phải tồn tại trong hệ thống.
- Cần có cơ chế xác nhận trước khi xóa để tránh nhầm lẫn.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/admin/users/{userId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần xóa.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId`.
- Cập nhật trường `deletedAt` của bản ghi người dùng với thời gian hiện tại (đánh dấu là đã xóa).
- Vô hiệu hóa (revoke) tất cả các phiên đăng nhập (Tokens) hiện tại của người dùng.
- Vô hiệu hóa (disable) các API Keys đang hoạt động của người dùng.
- Ghi log hoạt động xóa tài khoản của Admin.
- (Tùy chọn) Gửi email thông báo cho người dùng về việc tài khoản của họ đã bị xóa.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `204 No Content` nếu thành công (hoặc `200 OK` với thông báo).
- **Body**: (Nếu `200 OK`)

```json
{
  "message": "User account deleted successfully."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


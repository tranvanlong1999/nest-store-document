
# UC04: Khóa/mở khóa tài khoản user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thay đổi trạng thái của tài khoản người dùng, cụ thể là khóa (LOCK) hoặc mở khóa (UNLOCK) tài khoản. Khi một tài khoản bị khóa, người dùng sẽ không thể đăng nhập hoặc sử dụng bất kỳ dịch vụ nào của hệ thống. Khi tài khoản được mở khóa, người dùng có thể truy cập lại bình thường.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng.
- User với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/users/{userId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần thay đổi trạng thái.
- **Body (JSON)**:

```json
{
  "status": "LOCKED"  // Hoặc "ACTIVE"
}
```

- **Constraints**: 
    - `status` phải là một trong các giá trị hợp lệ: `LOCKED` hoặc `ACTIVE`.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId`.
- Cập nhật trạng thái `status` của người dùng trong cơ sở dữ liệu.
- Ghi log hoạt động của Admin (ai đã khóa/mở khóa tài khoản nào, khi nào).
- (Tùy chọn) Gửi thông báo (email/in-app) cho người dùng về việc tài khoản của họ đã bị khóa/mở khóa.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái mới của người dùng:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "status": "LOCKED", // Trạng thái mới của tài khoản
  "message": "User account status updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `status` trong request body không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


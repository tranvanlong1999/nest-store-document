
# UC06: Reset mật khẩu cho user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) đặt lại mật khẩu cho một người dùng cụ thể. Sau khi mật khẩu được đặt lại, hệ thống sẽ tạo một mật khẩu tạm thời hoặc gửi liên kết đặt lại mật khẩu đến email của người dùng, cho phép họ thiết lập mật khẩu mới.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng.
- User với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/users/{userId}/reset-password`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần reset mật khẩu.
- **Body (JSON)**: (Tùy chọn, có thể không cần body nếu hệ thống tự động tạo mật khẩu tạm thời hoặc gửi link)

```json
{
  "sendEmail": true // Gửi email chứa link reset password cho user
}
```

- **Constraints**: 
    - Nếu `sendEmail` là `true`, email của người dùng phải hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId`.
- Tạo một token đặt lại mật khẩu duy nhất và lưu trữ nó với thời gian hết hạn, hoặc tạo một mật khẩu tạm thời.
- Gửi email chứa liên kết đặt lại mật khẩu (kèm token) hoặc mật khẩu tạm thời đến địa chỉ email của người dùng.
- Ghi log hoạt động reset mật khẩu của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON thông báo đã gửi email đặt lại mật khẩu hoặc cung cấp mật khẩu tạm thời:

```json
{
  "message": "Password reset link has been sent to the user's email."
  // Hoặc: "temporaryPassword": "tempP@ssw0rd"
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi gửi email).


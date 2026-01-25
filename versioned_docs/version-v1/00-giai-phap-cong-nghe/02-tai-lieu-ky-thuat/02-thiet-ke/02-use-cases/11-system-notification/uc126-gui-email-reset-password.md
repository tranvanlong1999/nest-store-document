
# UC126: Gửi email reset password

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email đặt lại mật khẩu cho người dùng khi họ yêu cầu. Email này chứa một liên kết đặt lại mật khẩu duy nhất, cho phép người dùng tạo mật khẩu mới một cách an toàn mà không cần biết mật khẩu cũ.

## 2. Tiền xử lý

- Người dùng đã yêu cầu đặt lại mật khẩu thông qua `User Service`.
- `User Service` đã tạo một token đặt lại mật khẩu duy nhất và gửi yêu cầu gửi email đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email đặt lại mật khẩu.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-password-reset`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "resetLink": "https://yourdomain.com/reset-password?token=xyzabc"
}
```

- **Constraints**: 
    - `userId`, `email`, `resetLink` là bắt buộc.
    - `email` phải là định dạng email hợp lệ.
    - `resetLink` phải là một URL hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email đặt lại mật khẩu.
- Xác thực thông tin đầu vào.
- Sử dụng `email` và `resetLink` để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi email đặt lại mật khẩu, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Password reset email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


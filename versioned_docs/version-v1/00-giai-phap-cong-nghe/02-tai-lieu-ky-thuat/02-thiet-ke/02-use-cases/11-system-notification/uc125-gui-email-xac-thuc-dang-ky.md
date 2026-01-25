# UC125: Gửi email xác thực đăng ký

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email xác thực đăng ký cho người dùng mới sau khi họ hoàn tất quá trình đăng ký tài khoản. Email này chứa một liên kết hoặc mã xác thực mà người dùng cần nhấp vào hoặc nhập để kích hoạt tài khoản của họ, đảm bảo rằng địa chỉ email được cung cấp là hợp lệ và thuộc về người dùng.

## 2. Tiền xử lý

- Người dùng đã hoàn tất việc đăng ký tài khoản trên `User Service`.
- `User Service` đã gửi yêu cầu gửi email xác thực đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email xác thực.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-verification`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "verificationLink": "https://yourdomain.com/verify?token=abcxyz"
}
```

- **Constraints**: 
    - `userId`, `email`, `verificationLink` là bắt buộc.
    - `email` phải là định dạng email hợp lệ.
    - `verificationLink` phải là một URL hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email xác thực.
- Xác thực thông tin đầu vào.
- Sử dụng `email` và `verificationLink` để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email (ví dụ: SendGrid, Mailgun, hoặc SMTP server).
- Ghi log hoạt động gửi email, bao gồm trạng thái gửi (thành công/thất bại).

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Verification email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với dịch vụ email, lỗi mẫu email).


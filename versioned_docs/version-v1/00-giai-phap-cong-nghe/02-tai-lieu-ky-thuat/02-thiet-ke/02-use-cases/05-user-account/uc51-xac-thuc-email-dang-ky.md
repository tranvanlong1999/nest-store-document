
# UC51: Xác thực email đăng ký

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng xác thực địa chỉ email của họ sau khi đăng ký tài khoản. Việc xác thực được thực hiện thông qua một liên kết duy nhất được gửi đến email của người dùng. Sau khi xác thực thành công, tài khoản của người dùng sẽ được kích hoạt và họ có thể đăng nhập vào hệ thống.

## 2. Tiền xử lý

- Người dùng đã đăng ký tài khoản nhưng chưa xác thực email (trạng thái `PENDING_VERIFICATION`).
- Người dùng đã nhận được email xác thực chứa liên kết hợp lệ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/auth/verify-email?token={verificationToken}`
- **Authentication**: Không yêu cầu (public endpoint).

## 4. Yêu cầu đầu vào

- **Query Parameter**: `verificationToken` (String) - Token xác thực duy nhất được gửi qua email.

## 5. Hậu xử lý

- Hệ thống kiểm tra tính hợp lệ và thời hạn của `verificationToken`.
- Nếu token hợp lệ, tìm người dùng tương ứng và cập nhật trạng thái tài khoản từ `PENDING_VERIFICATION` thành `ACTIVE`.
- Ghi log hoạt động xác thực email.
- (Tùy chọn) Chuyển hướng người dùng đến trang đăng nhập hoặc trang thông báo xác thực thành công.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu xác thực thành công.
- **Body**: Một đối tượng JSON thông báo xác thực thành công:

```json
{
  "message": "Email verification successful. Your account is now active."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `verificationToken` bị thiếu hoặc không hợp lệ.
    - `404 Not Found`: Nếu không tìm thấy người dùng tương ứng với token.
    - `410 Gone`: Nếu `verificationToken` đã hết hạn.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


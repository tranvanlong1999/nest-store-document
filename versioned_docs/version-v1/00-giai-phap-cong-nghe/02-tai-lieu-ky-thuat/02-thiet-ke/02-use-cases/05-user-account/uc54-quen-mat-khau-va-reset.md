
# UC54: Quên mật khẩu và reset

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã quên mật khẩu có thể yêu cầu đặt lại mật khẩu của họ. Quá trình này bao gồm việc người dùng cung cấp email đã đăng ký, hệ thống gửi một liên kết đặt lại mật khẩu đến email đó, và người dùng sử dụng liên kết để thiết lập mật khẩu mới.

## 2. Tiền xử lý

- Người dùng đã có tài khoản trong hệ thống.
- Hệ thống email gửi đi phải hoạt động bình thường.

## 3. Định nghĩa Endpoint

### 3.1. Yêu cầu đặt lại mật khẩu

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/forgot-password`
- **Authentication**: Không yêu cầu (public endpoint).

### 3.2. Đặt lại mật khẩu với token

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/reset-password`
- **Authentication**: Không yêu cầu (public endpoint).

## 4. Yêu cầu đầu vào

### 4.1. Yêu cầu đặt lại mật khẩu

- **Body (JSON)**:

```json
{
  "email": "user@example.com"
}
```

- **Constraints**: 
    - `email` là bắt buộc và phải là định dạng email hợp lệ, đã đăng ký trong hệ thống.

### 4.2. Đặt lại mật khẩu với token

- **Body (JSON)**:

```json
{
  "token": "reset-token-duy-nhat",
  "newPassword": "NewStrongPassword123!"
}
```

- **Constraints**: 
    - `token` là bắt buộc, phải là token đặt lại mật khẩu hợp lệ và chưa hết hạn.
    - `newPassword` là bắt buộc, phải đáp ứng các yêu cầu về độ mạnh (ví dụ: tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt).

## 5. Hậu xử lý

### 5.1. Yêu cầu đặt lại mật khẩu

- Hệ thống kiểm tra email có tồn tại trong hệ thống hay không.
- Nếu email tồn tại, tạo một token đặt lại mật khẩu duy nhất và lưu trữ nó với thời gian hết hạn.
- Gửi email chứa liên kết đặt lại mật khẩu (kèm token) đến địa chỉ email của người dùng.
- Ghi log hoạt động yêu cầu đặt lại mật khẩu.

### 5.2. Đặt lại mật khẩu với token

- Hệ thống kiểm tra tính hợp lệ và thời hạn của token đặt lại mật khẩu.
- Nếu token hợp lệ, mã hóa `newPassword`.
- Cập nhật mật khẩu mới cho người dùng tương ứng trong cơ sở dữ liệu.
- Vô hiệu hóa hoặc xóa token đặt lại mật khẩu để ngăn chặn việc sử dụng lại.
- Ghi log hoạt động đặt lại mật khẩu thành công.

## 6. Yêu cầu đầu ra

### 6.1. Yêu cầu đặt lại mật khẩu

- **HTTP Status**: `200 OK` nếu yêu cầu được xử lý.
- **Body**: Một đối tượng JSON thông báo đã gửi email đặt lại mật khẩu:

```json
{
  "message": "If your email address is registered with us, you will receive a password reset link."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu email không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi gửi email).

### 6.2. Đặt lại mật khẩu với token

- **HTTP Status**: `200 OK` nếu đặt lại mật khẩu thành công.
- **Body**: Một đối tượng JSON thông báo đặt lại mật khẩu thành công:

```json
{
  "message": "Password has been reset successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `token` hoặc `newPassword` không hợp lệ.
    - `401 Unauthorized`: Nếu `token` không hợp lệ hoặc đã hết hạn.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


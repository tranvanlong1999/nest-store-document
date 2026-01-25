# UC50: Đăng ký tài khoản mới

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng mới đăng ký tài khoản trên hệ thống SaaS. Quá trình đăng ký bao gồm việc cung cấp thông tin cơ bản như email và mật khẩu, sau đó hệ thống sẽ gửi email xác thực để hoàn tất quá trình đăng ký.

## 2. Tiền xử lý

- Người dùng chưa có tài khoản trên hệ thống.
- Hệ thống email gửi đi phải hoạt động bình thường.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/register`
- **Authentication**: Không yêu cầu (public endpoint).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "email": "newuser@example.com",
  "password": "StrongPassword123!",
  "fullName": "Nguyen Van C"
}
```

- **Constraints**: 
    - `email` là bắt buộc, phải là định dạng email hợp lệ và chưa tồn tại trong hệ thống.
    - `password` là bắt buộc, phải đáp ứng các yêu cầu về độ mạnh (ví dụ: tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt).
    - `fullName` là bắt buộc.

## 5. Hậu xử lý

- Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Mã hóa mật khẩu của người dùng.
- Tạo bản ghi người dùng mới trong cơ sở dữ liệu với trạng thái `PENDING_VERIFICATION`.
- Gửi email xác thực đến địa chỉ email của người dùng, chứa một liên kết xác thực với token duy nhất.
- Ghi log hoạt động đăng ký.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu đăng ký thành công.
- **Body**: Một đối tượng JSON thông báo đăng ký thành công và hướng dẫn xác thực:

```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "userId": "uuid-cua-user-moi"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (email đã tồn tại, mật khẩu yếu, thiếu trường).
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi gửi email xác thực).



# UC52: Đăng nhập bằng email/password

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng ký và xác thực tài khoản đăng nhập vào hệ thống bằng địa chỉ email và mật khẩu của họ. Sau khi đăng nhập thành công, hệ thống sẽ cấp một mã thông báo (JWT Token) để người dùng có thể truy cập các tài nguyên được bảo vệ.

## 2. Tiền xử lý

- Người dùng đã có tài khoản `ACTIVE` trong hệ thống.
- Người dùng cung cấp đúng email và mật khẩu.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/auth/login`
- **Authentication**: Không yêu cầu (public endpoint).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "email": "user@example.com",
  "password": "UserPassword123"
}
```

- **Constraints**: 
    - `email` là bắt buộc và phải là định dạng email hợp lệ.
    - `password` là bắt buộc.

## 5. Hậu xử lý

- Hệ thống kiểm tra tính hợp lệ của email và mật khẩu được cung cấp.
- Nếu thông tin đăng nhập hợp lệ và tài khoản đang ở trạng thái `ACTIVE`:
    - Tạo một JWT Token chứa thông tin người dùng và quyền hạn.
    - Ghi log lịch sử đăng nhập của người dùng (thời gian, IP).
- Nếu thông tin đăng nhập không hợp lệ hoặc tài khoản không hoạt động, trả về lỗi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu đăng nhập thành công.
- **Body**: Một đối tượng JSON chứa JWT Token và thông tin người dùng cơ bản:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600, // Thời gian hết hạn của token (giây)
  "user": {
    "userId": "uuid-cua-user",
    "email": "user@example.com",
    "fullName": "Nguyen Van C",
    "roles": ["USER", "DEVELOPER"]
  }
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu email/password).
    - `401 Unauthorized`: Nếu email hoặc mật khẩu không đúng, hoặc tài khoản không hoạt động (ví dụ: `PENDING_VERIFICATION`, `LOCKED`).
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


# UC53: Đăng nhập bằng OAuth2 (Google, GitHub)

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đăng nhập vào hệ thống bằng tài khoản của các nhà cung cấp dịch vụ bên thứ ba như Google hoặc GitHub thông qua giao thức OAuth2. Điều này giúp đơn giản hóa quá trình đăng nhập và tăng cường trải nghiệm người dùng bằng cách loại bỏ nhu cầu ghi nhớ thêm một cặp tên người dùng/mật khẩu.

## 2. Tiền xử lý

- Người dùng có tài khoản hợp lệ với nhà cung cấp OAuth2 (Google, GitHub).
- Hệ thống đã được cấu hình với các thông tin client ID và client secret từ các nhà cung cấp OAuth2.

## 3. Định nghĩa Endpoint

### 3.1. Khởi tạo quá trình đăng nhập OAuth2

- **HTTP Method**: `GET`
- **URL**: `/api/v1/auth/oauth2/google` (hoặc `/github`, v.v.)
- **Authentication**: Không yêu cầu.

### 3.2. Callback từ nhà cung cấp OAuth2

- **HTTP Method**: `GET`
- **URL**: `/api/v1/auth/oauth2/callback/google` (hoặc `/github`, v.v.)
- **Authentication**: Không yêu cầu (nhà cung cấp OAuth2 sẽ gửi code/token).

## 4. Yêu cầu đầu vào

### 4.1. Khởi tạo quá trình đăng nhập OAuth2

Không có tham số đầu vào trực tiếp từ client. Client chỉ cần điều hướng đến URL này.

### 4.2. Callback từ nhà cung cấp OAuth2

- **Query Parameters**: 
    - `code`: (String) Mã ủy quyền được cung cấp bởi nhà cung cấp OAuth2.
    - `state`: (String) Trạng thái được sử dụng để ngăn chặn tấn công CSRF (nếu có).

## 5. Hậu xử lý

### 5.1. Khởi tạo quá trình đăng nhập OAuth2

- Hệ thống tạo một URL ủy quyền đến nhà cung cấp OAuth2 (ví dụ: Google, GitHub) và chuyển hướng người dùng đến đó.
- (Tùy chọn) Tạo và lưu trữ một `state` token để xác minh callback.

### 5.2. Callback từ nhà cung cấp OAuth2

- Hệ thống nhận `code` và `state` từ nhà cung cấp OAuth2.
- Xác minh `state` token để đảm bảo tính hợp lệ của yêu cầu.
- Gửi `code` đến nhà cung cấp OAuth2 để đổi lấy `access_token` và `id_token` (nếu có).
- Sử dụng `access_token` để lấy thông tin profile người dùng từ nhà cung cấp OAuth2.
- Kiểm tra xem người dùng đã tồn tại trong hệ thống chưa (dựa trên email hoặc ID duy nhất từ OAuth2).
    - Nếu chưa, tạo tài khoản người dùng mới và liên kết với thông tin OAuth2.
    - Nếu đã có, cập nhật thông tin người dùng (nếu cần) và liên kết tài khoản OAuth2.
- Tạo JWT Token nội bộ cho người dùng và trả về cho client.
- Ghi log hoạt động đăng nhập OAuth2.

## 6. Yêu cầu đầu ra

### 6.1. Khởi tạo quá trình đăng nhập OAuth2

- **HTTP Status**: `302 Found` (Redirect) đến URL của nhà cung cấp OAuth2.

### 6.2. Callback từ nhà cung cấp OAuth2

- **HTTP Status**: `302 Found` (Redirect) đến trang chủ hoặc dashboard của ứng dụng với JWT Token trong URL (ví dụ: `/#/dashboard?token=...`) hoặc trong cookie.
- **Body**: (Nếu không redirect, trả về JSON)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "user": {
    "userId": "uuid-cua-user",
    "email": "user@example.com",
    "fullName": "User from Google",
    "roles": ["USER"]
  }
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `code` hoặc `state` không hợp lệ.
    - `401 Unauthorized`: Nếu quá trình xác thực OAuth2 thất bại.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


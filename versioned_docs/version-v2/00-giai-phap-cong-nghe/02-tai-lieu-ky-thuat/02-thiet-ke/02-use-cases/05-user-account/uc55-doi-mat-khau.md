
# UC55: Đổi mật khẩu

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập thay đổi mật khẩu của tài khoản của họ. Để đảm bảo bảo mật, người dùng cần cung cấp mật khẩu hiện tại và mật khẩu mới.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải cung cấp đúng mật khẩu hiện tại.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/users/change-password`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewStrongPassword123!"
}
```

- **Constraints**: 
    - `currentPassword` là bắt buộc và phải khớp với mật khẩu hiện tại của người dùng.
    - `newPassword` là bắt buộc, phải đáp ứng các yêu cầu về độ mạnh (ví dụ: tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt) và không được trùng với mật khẩu hiện tại.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và kiểm tra mật khẩu hiện tại của người dùng.
- Nếu mật khẩu hiện tại đúng và mật khẩu mới hợp lệ:
    - Mã hóa mật khẩu mới.
    - Cập nhật mật khẩu mới vào cơ sở dữ liệu.
    - (Tùy chọn) Vô hiệu hóa tất cả các phiên đăng nhập cũ của người dùng (trừ phiên hiện tại).
    - Ghi log hoạt động đổi mật khẩu.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu đổi mật khẩu thành công.
- **Body**: Một đối tượng JSON thông báo đổi mật khẩu thành công:

```json
{
  "message": "Password changed successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (mật khẩu mới yếu, trùng mật khẩu cũ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập, JWT Token không hợp lệ, hoặc mật khẩu hiện tại không đúng.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


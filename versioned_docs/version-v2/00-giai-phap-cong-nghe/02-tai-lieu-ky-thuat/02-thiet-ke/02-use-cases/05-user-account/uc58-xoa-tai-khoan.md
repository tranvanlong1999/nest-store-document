
# UC58: Xóa tài khoản

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập tự xóa tài khoản của họ khỏi hệ thống. Quá trình này thường yêu cầu xác nhận để đảm bảo người dùng thực sự muốn xóa tài khoản và hiểu rõ các hậu quả (mất dữ liệu, mất quyền truy cập).

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải xác nhận ý định xóa tài khoản (ví dụ: nhập lại mật khẩu, xác nhận qua email).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/users/account`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "password": "UserCurrentPassword123!",
  "confirmation": true
}
```

- **Constraints**: 
    - `password` là bắt buộc và phải khớp với mật khẩu hiện tại của người dùng để xác nhận.
    - `confirmation` là bắt buộc và phải là `true`.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Xác minh mật khẩu hiện tại của người dùng.
- Nếu xác nhận thành công, hệ thống sẽ:
    - Đánh dấu tài khoản người dùng là `DELETED` hoặc `INACTIVE` (soft delete) thay vì xóa vĩnh viễn ngay lập tức để phục hồi nếu cần.
    - Xóa hoặc vô hiệu hóa tất cả các dữ liệu liên quan đến người dùng (API Keys, Subscriptions, Usage Logs, v.v.).
    - Ghi log hoạt động xóa tài khoản.
    - (Tùy chọn) Gửi email xác nhận việc xóa tài khoản.
- Người dùng sẽ bị đăng xuất khỏi hệ thống.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON thông báo xóa tài khoản thành công:

```json
{
  "message": "Your account has been successfully deleted."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (mật khẩu sai, thiếu xác nhận).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


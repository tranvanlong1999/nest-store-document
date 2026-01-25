
# UC07: Thay đổi thông tin user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thay đổi thông tin cá nhân của một người dùng cụ thể, bao gồm email, tên đầy đủ, và các thông tin profile khác. Điều này hữu ích khi người dùng yêu cầu thay đổi thông tin hoặc khi có sự điều chỉnh cần thiết từ phía quản trị.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng.
- User với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/users/{username}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `username` (String) - Email (Username) của người dùng cần thay đổi thông tin.
- **Body (JSON)**:

```json
{
  "email": "new_email@example.com",
  "fullName": "Nguyen Van E",
  "avatarUrl": "https://example.com/new_avatar_admin.jpg"
}
```

- **Constraints**: 
    - Các trường trong body là tùy chọn; chỉ các trường được cung cấp sẽ được cập nhật.
    - `email`: Đóng vai trò là Username đăng nhập. Nếu được cung cấp, phải là định dạng email hợp lệ và **tuyệt đối không được trùng** với bất kỳ người dùng nào khác trong hệ thống.
    - `fullName` nếu được cung cấp không được rỗng.
    - `avatarUrl` nếu được cung cấp phải là một URL hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `username` (email).
- Kiểm tra tính hợp lệ của dữ liệu đầu vào (ví dụ: email không trùng lặp).
- Cập nhật các trường thông tin được cung cấp vào cơ sở dữ liệu cho người dùng tương ứng.
- Ghi log hoạt động cập nhật thông tin người dùng của Admin.
- (Tùy chọn) Gửi thông báo cho người dùng về sự thay đổi thông tin tài khoản của họ.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin người dùng đã được cập nhật:

```json
{
  "userId": "uuid-cua-user",
  "email": "new_email@example.com",
  "fullName": "Nguyen Van E",
  "avatarUrl": "https://example.com/new_avatar_admin.jpg",
  "status": "ACTIVE",
  "message": "User information updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: email đã tồn tại, sai định dạng).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `username` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


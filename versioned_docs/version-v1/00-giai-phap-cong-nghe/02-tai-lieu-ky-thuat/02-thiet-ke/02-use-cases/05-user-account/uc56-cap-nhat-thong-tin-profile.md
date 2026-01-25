
# UC56: Cập nhật thông tin profile

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập cập nhật thông tin cá nhân trong hồ sơ của họ, bao gồm tên đầy đủ và URL ảnh đại diện. Điều này giúp người dùng duy trì thông tin cá nhân chính xác và cập nhật.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/users/profile`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "fullName": "Nguyen Van D",
  "avatarUrl": "https://example.com/new_avatar.jpg"
}
```

- **Constraints**: 
    - Các trường trong body là tùy chọn; chỉ các trường được cung cấp sẽ được cập nhật.
    - `fullName` nếu được cung cấp không được rỗng.
    - `avatarUrl` nếu được cung cấp phải là một URL hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Cập nhật các trường thông tin được cung cấp (`fullName`, `avatarUrl`) vào cơ sở dữ liệu cho người dùng tương ứng.
- Ghi log hoạt động cập nhật profile.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu cập nhật thành công.
- **Body**: Một đối tượng JSON chứa thông tin profile đã được cập nhật của người dùng:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "fullName": "Nguyen Van D",
  "avatarUrl": "https://example.com/new_avatar.jpg",
  "message": "Profile updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `avatarUrl` không phải là URL).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


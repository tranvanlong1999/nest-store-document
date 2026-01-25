
# UC57: Đổi avatar

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập thay đổi ảnh đại diện (avatar) của họ. Người dùng có thể tải lên một hình ảnh mới hoặc chọn từ các tùy chọn có sẵn (nếu có). Ảnh đại diện sẽ được hiển thị trên profile và các khu vực khác trong hệ thống.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng có một hình ảnh hợp lệ để tải lên (nếu chọn tải lên).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/users/profile/avatar`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Content-Type**: `multipart/form-data`
- **Body**: 
    - `avatarFile`: (File) Tệp hình ảnh để tải lên (ví dụ: PNG, JPG, JPEG).

- **Constraints**: 
    - Kích thước tệp tối đa (ví dụ: 5MB).
    - Định dạng tệp được hỗ trợ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Nhận tệp hình ảnh được tải lên.
- Kiểm tra tính hợp lệ của tệp (kích thước, định dạng).
- Lưu trữ hình ảnh vào hệ thống lưu trữ tệp (ví dụ: S3, Google Cloud Storage) và tạo một URL công khai cho nó.
- Cập nhật `avatarUrl` của người dùng trong cơ sở dữ liệu với URL mới.
- (Tùy chọn) Xóa avatar cũ khỏi hệ thống lưu trữ.
- Ghi log hoạt động đổi avatar.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa URL của avatar mới:

```json
{
  "userId": "uuid-cua-user",
  "avatarUrl": "https://cdn.example.com/avatars/uuid-cua-user-new-avatar.png",
  "message": "Avatar updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tệp không hợp lệ (kích thước quá lớn, định dạng không hỗ trợ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi lưu trữ tệp).


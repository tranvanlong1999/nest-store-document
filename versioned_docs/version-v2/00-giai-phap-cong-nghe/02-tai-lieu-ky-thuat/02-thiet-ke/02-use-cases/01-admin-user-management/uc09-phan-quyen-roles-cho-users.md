
# UC09: Phân quyền roles cho users

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) gán hoặc gỡ bỏ các vai trò (roles) cho một người dùng cụ thể. Điều này giúp kiểm soát quyền truy cập của người dùng vào các chức năng và tài nguyên khác nhau của hệ thống.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng và vai trò.
- User với ID được cung cấp phải tồn tại trong hệ thống.
- Các vai trò được gán phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/users/{userId}/roles`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần phân quyền.
- **Body (JSON)**:

```json
{
  "roleIds": [1, 2] // Danh sách các roleId mà người dùng sẽ có
}
```

- **Constraints**: 
    - `roleIds` là một mảng các số nguyên, mỗi số là ID của một vai trò.
    - Các `roleId` phải tồn tại trong hệ thống.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId` và kiểm tra các `roleId` có hợp lệ không.
- Cập nhật mối quan hệ giữa người dùng và vai trò trong bảng `USER_ROLES` (xóa các vai trò cũ không có trong danh sách mới, thêm các vai trò mới).
- Ghi log hoạt động phân quyền của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận các vai trò mới của người dùng:

```json
{
  "userId": "uuid-cua-user",
  "roles": ["ADMIN", "DEVELOPER"],
  "message": "User roles updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `roleIds` rỗng, `roleId` không tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


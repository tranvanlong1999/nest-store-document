
# UC08: Tạo và quản lý roles

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) tạo mới, xem, cập nhật và xóa các vai trò (roles) trong hệ thống. Mỗi vai trò sẽ có một tập hợp các quyền (permissions) nhất định, định nghĩa những hành động mà người dùng thuộc vai trò đó có thể thực hiện. Điều này giúp quản lý quyền truy cập một cách linh hoạt và có tổ chức.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý vai trò.

## 3. Định nghĩa Endpoint

### 3.1. Tạo vai trò mới

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/roles`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

### 3.2. Xem danh sách vai trò

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/roles`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

### 3.3. Cập nhật vai trò

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/roles/{roleId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

### 3.4. Xóa vai trò

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/admin/roles/{roleId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

### 4.1. Tạo vai trò mới

- **Body (JSON)**:

```json
{
  "roleName": "EDITOR",
  "permissions": ["VIEW_CONTENT", "EDIT_CONTENT"]
}
```

- **Constraints**: 
    - `roleName` là bắt buộc và phải là duy nhất.
    - `permissions` là một mảng các chuỗi, mỗi chuỗi là một quyền cụ thể.

### 4.2. Xem danh sách vai trò

Không có tham số đầu vào.

### 4.3. Cập nhật vai trò

- **Path Parameter**: `roleId` (Integer) - ID của vai trò cần cập nhật.
- **Body (JSON)**:

```json
{
  "roleName": "CONTENT_EDITOR",
  "permissions": ["VIEW_CONTENT", "EDIT_CONTENT", "PUBLISH_CONTENT"]
}
```

- **Constraints**: 
    - Các trường trong body là tùy chọn; chỉ các trường được cung cấp sẽ được cập nhật.
    - `roleName` nếu được cung cấp phải là duy nhất.

### 4.4. Xóa vai trò

- **Path Parameter**: `roleId` (Integer) - ID của vai trò cần xóa.

## 5. Hậu xử lý

### 5.1. Tạo vai trò mới

- Hệ thống kiểm tra tính hợp lệ của `roleName`.
- Lưu vai trò mới vào cơ sở dữ liệu.
- Ghi log hoạt động.

### 5.2. Xem danh sách vai trò

- Truy vấn cơ sở dữ liệu để lấy tất cả các vai trò.
- Trả về danh sách.

### 5.3. Cập nhật vai trò

- Hệ thống xác định vai trò theo `roleId`.
- Cập nhật thông tin vai trò trong cơ sở dữ liệu.
- Ghi log hoạt động.

### 5.4. Xóa vai trò

- Hệ thống xác định vai trò theo `roleId`.
- Xóa vai trò khỏi cơ sở dữ liệu. Đảm bảo không có người dùng nào đang được gán vai trò này trước khi xóa hoặc xử lý các người dùng đó.
- Ghi log hoạt động.

## 6. Yêu cầu đầu ra

### 6.1. Tạo vai trò mới

- **HTTP Status**: `201 Created`.
- **Body**: Đối tượng JSON của vai trò vừa tạo:

```json
{
  "roleId": 3,
  "roleName": "EDITOR",
  "permissions": ["VIEW_CONTENT", "EDIT_CONTENT"]
}
```

### 6.2. Xem danh sách vai trò

- **HTTP Status**: `200 OK`.
- **Body**: Mảng JSON chứa danh sách các vai trò:

```json
[
  {
    "roleId": 1,
    "roleName": "ADMIN",
    "permissions": ["MANAGE_USERS", "MANAGE_SERVICES"]
  },
  {
    "roleId": 2,
    "roleName": "USER",
    "permissions": ["VIEW_DASHBOARD", "USE_SERVICES"]
  }
]
```

### 6.3. Cập nhật vai trò

- **HTTP Status**: `200 OK`.
- **Body**: Đối tượng JSON của vai trò đã cập nhật:

```json
{
  "roleId": 3,
  "roleName": "CONTENT_EDITOR",
  "permissions": ["VIEW_CONTENT", "EDIT_CONTENT", "PUBLISH_CONTENT"]
}
```

### 6.4. Xóa vai trò

- **HTTP Status**: `204 No Content`.

- **Trường hợp lỗi chung**: 
    - `400 Bad Request`: Dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Admin không có quyền.
    - `404 Not Found`: Không tìm thấy vai trò.
    - `409 Conflict`: `roleName` đã tồn tại (khi tạo/cập nhật).
    - `500 Internal Server Error`: Lỗi server.


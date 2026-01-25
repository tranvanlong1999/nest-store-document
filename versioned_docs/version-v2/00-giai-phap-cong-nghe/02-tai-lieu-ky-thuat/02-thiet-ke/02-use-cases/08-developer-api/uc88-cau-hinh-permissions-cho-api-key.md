
# UC88: Cấu hình permissions cho API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) cấu hình các quyền (permissions) cho từng API key của họ. Điều này giúp tăng cường bảo mật bằng cách giới hạn các hành động mà một API key có thể thực hiện, đảm bảo rằng mỗi key chỉ có quyền truy cập vào các tài nguyên và chức năng cần thiết cho mục đích sử dụng của nó.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API key cần cấu hình phải tồn tại và thuộc về người dùng.
- Hệ thống phải có danh sách các quyền có sẵn để gán cho API key.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}/permissions`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API key cần cấu hình quyền.
- **Body (JSON)**:

```json
{
  "permissions": [
    "service:stt:read",
    "service:ekyc:write",
    "user:profile:read"
  ]
}
```

- **Constraints**: 
    - `permissions` là bắt buộc, phải là một mảng các chuỗi quyền hợp lệ.
    - Các quyền phải nằm trong phạm vi cho phép của gói dịch vụ mà người dùng đang sử dụng.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `apiKeyId` có hợp lệ và thuộc về người dùng hiện tại không.
- Xác thực các quyền được yêu cầu có hợp lệ và nằm trong giới hạn của người dùng không.
- Cập nhật danh sách quyền cho API key trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình quyền của API key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin cập nhật của API key với các quyền mới:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "permissions": [
    "service:stt:read",
    "service:ekyc:write",
    "user:profile:read"
  ],
  "message": "API key permissions updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: quyền không hợp lệ, quyền vượt quá giới hạn gói dịch vụ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API key không thuộc về người dùng hiện tại hoặc người dùng không có quyền cấu hình quyền này.
    - `404 Not Found`: Nếu không tìm thấy API key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


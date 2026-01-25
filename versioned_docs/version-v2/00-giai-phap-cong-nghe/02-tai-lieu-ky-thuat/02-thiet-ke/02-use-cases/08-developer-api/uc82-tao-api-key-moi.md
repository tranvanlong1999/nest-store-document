# UC82: Tạo API key mới

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer (một vai trò của End User) tạo một API Key mới để truy cập các dịch vụ của hệ thống. API Key này sẽ được sử dụng để xác thực các yêu cầu API và theo dõi mức độ sử dụng.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.
- Developer chưa đạt giới hạn số lượng API Key được phép tạo (nếu có).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/developer/api-keys`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "name": "My First API Key",
  "description": "API Key for my web application"
}
```

- **Constraints**: 
    - `name` là bắt buộc, không được rỗng và phải là duy nhất cho mỗi người dùng.
    - `description` là tùy chọn.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Tạo một API Key duy nhất (chuỗi ngẫu nhiên) và mã hóa nó để lưu trữ an toàn trong cơ sở dữ liệu.
- Lưu thông tin API Key (bao gồm tên, mô tả, trạng thái kích hoạt, và `key_hash`) vào cơ sở dữ liệu, liên kết với `user_id` của Developer.
- Ghi log hoạt động tạo API Key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin của API Key vừa được tạo, bao gồm cả giá trị `key` (chỉ hiển thị một lần khi tạo):

```json
{
  "apiKeyId": "uuid-cua-api-key-moi",
  "name": "My First API Key",
  "description": "API Key for my web application",
  "key": "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Chỉ hiển thị một lần
  "isActive": true,
  "createdAt": "2023-07-15T17:00:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu tên, tên trùng).
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Developer không có quyền hoặc đã đạt giới hạn số lượng API Key.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


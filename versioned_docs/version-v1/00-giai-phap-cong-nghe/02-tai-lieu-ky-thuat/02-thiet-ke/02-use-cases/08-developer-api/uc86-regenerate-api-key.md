
# UC86: Regenerate API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) tạo lại (regenerate) một API key hiện có. Khi một API key được tạo lại, giá trị cũ của key sẽ bị vô hiệu hóa và một giá trị mới sẽ được tạo ra. Điều này hữu ích trong các trường hợp key bị lộ, hoặc để tăng cường bảo mật bằng cách xoay vòng key định kỳ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API key cần tạo lại phải tồn tại và thuộc về người dùng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}/regenerate`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API key cần tạo lại.
- **Body (JSON)**: (Tùy chọn, có thể không cần body nếu chỉ cần xác nhận)

```json
{
  "confirm": true // Xác nhận việc tạo lại key
}
```

- **Constraints**: 
    - `confirm` là bắt buộc và phải là `true` để tránh việc tạo lại key ngoài ý muốn.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `apiKeyId` có hợp lệ và thuộc về người dùng hiện tại không.
- Vô hiệu hóa giá trị API key cũ trong cơ sở dữ liệu.
- Tạo một giá trị API key mới, duy nhất và an toàn.
- Cập nhật API key mới vào cơ sở dữ liệu cho `apiKeyId` tương ứng.
- Ghi log hoạt động tạo lại API key, bao gồm cả việc key cũ đã bị vô hiệu hóa.
- (Tùy chọn) Gửi thông báo cho người dùng về việc API key đã được tạo lại.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin của API key mới được tạo lại:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "newApiKey": "sk_live_new_api_key_value_generated",
  "message": "API key regenerated successfully. Please update your applications with the new key."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: thiếu xác nhận).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API key không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy API key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


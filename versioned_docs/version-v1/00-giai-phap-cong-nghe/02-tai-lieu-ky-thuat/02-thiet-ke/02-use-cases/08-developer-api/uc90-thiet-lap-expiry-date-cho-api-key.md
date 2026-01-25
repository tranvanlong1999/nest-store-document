
# UC90: Thiết lập expiry date cho API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) thiết lập ngày hết hạn (expiry date) cho một API key. Sau ngày này, API key sẽ tự động bị vô hiệu hóa. Điều này giúp tăng cường bảo mật bằng cách đảm bảo rằng các API key không được sử dụng vô thời hạn và giảm thiểu rủi ro khi một key bị lộ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API key cần thiết lập ngày hết hạn phải tồn tại và thuộc về người dùng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}/expiry`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API key cần thiết lập ngày hết hạn.
- **Body (JSON)**:

```json
{
  "expiryDate": "2024-12-31T23:59:59Z" // Ngày và giờ hết hạn (ISO 8601 format)
}
```

- **Constraints**: 
    - `expiryDate` là bắt buộc và phải là một ngày trong tương lai.
    - Có thể cho phép `null` để xóa ngày hết hạn (nếu hệ thống cho phép API key không hết hạn).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `apiKeyId` có hợp lệ và thuộc về người dùng hiện tại không.
- Xác thực `expiryDate` (phải là ngày trong tương lai).
- Cập nhật `expiryDate` cho API key trong cơ sở dữ liệu.
- Ghi log hoạt động thiết lập ngày hết hạn của API key.
- (Tùy chọn) Thiết lập một tác vụ nền để tự động vô hiệu hóa key khi đến ngày hết hạn.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin cập nhật của API key:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "expiryDate": "2024-12-31T23:59:59Z",
  "message": "API key expiry date updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: ngày hết hạn trong quá khứ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API key không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy API key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


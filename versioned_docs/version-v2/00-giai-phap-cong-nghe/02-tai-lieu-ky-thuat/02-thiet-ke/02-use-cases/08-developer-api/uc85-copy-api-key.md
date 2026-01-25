
# UC85: Copy API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer xem giá trị thực của một API Key để có thể sao chép và sử dụng trong ứng dụng của họ. Để đảm bảo bảo mật, giá trị API Key chỉ được hiển thị khi người dùng yêu cầu cụ thể và có thể yêu cầu xác thực lại.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.
- API Key với ID được cung cấp phải tồn tại và thuộc về Developer đó.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}/reveal`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API Key cần hiển thị giá trị.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Kiểm tra xem `apiKeyId` có thuộc về Developer đang yêu cầu hay không.
- Truy vấn cơ sở dữ liệu để lấy giá trị API Key (đã được giải mã nếu cần).
- Ghi log hoạt động hiển thị API Key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa giá trị của API Key:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "key": "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "message": "API Key revealed successfully. Please copy it now as it will not be shown again."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API Key không thuộc về Developer đang yêu cầu.
    - `404 Not Found`: Nếu không tìm thấy API Key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.



# UC91: Test API endpoints

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer thực hiện các cuộc gọi thử nghiệm (test calls) đến các API endpoint của dịch vụ trực tiếp từ giao diện người dùng (ví dụ: một API Playground). Điều này giúp Developer nhanh chóng kiểm tra chức năng của API và hiểu cách sử dụng chúng mà không cần phải viết code.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.
- Developer phải có ít nhất một API Key đang hoạt động.
- Dịch vụ API cần test phải tồn tại và được kích hoạt.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST` (hoặc các method tương ứng với API cần test)
- **URL**: `/api/v1/developer/api-playground/test`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "serviceId": "uuid-cua-service",
  "method": "POST",
  "path": "/stt/v1/convert",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "audioBase64": "<base64_encoded_audio_sample>",
    "language": "en-US"
  }
}
```

- **Constraints**: 
    - `apiKeyId` là bắt buộc, phải là ID của một API Key hợp lệ và thuộc về Developer.
    - `serviceId` là bắt buộc, phải là ID của một dịch vụ hợp lệ và được kích hoạt.
    - `method` là bắt buộc (GET, POST, PUT, DELETE, ...).
    - `path` là bắt buộc, đường dẫn API endpoint tương đối của dịch vụ.
    - `headers` và `body` là tùy chọn, phụ thuộc vào API cần test.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Sử dụng `apiKeyId` để lấy API Key thực tế và sử dụng nó để gọi đến API Gateway.
- API Gateway sẽ xử lý yêu cầu như một yêu cầu API thông thường (xác thực, kiểm tra quyền, rate limit, quota).
- Phản hồi từ dịch vụ backend được trả về cho Developer.
- Ghi log hoạt động test API.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` (hoặc mã trạng thái HTTP từ API được test).
- **Body**: Một đối tượng JSON chứa phản hồi từ API được test, bao gồm status code, headers và body:

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "text": "This is the converted text from speech."
  },
  "durationMs": 150 // Thời gian phản hồi của API test
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng).
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập, JWT Token không hợp lệ, hoặc API Key không hợp lệ/không thuộc về Developer.
    - `403 Forbidden`: Nếu API Key không có quyền truy cập dịch vụ, hoặc vượt quá quota/rate limit.
    - `404 Not Found`: Nếu `serviceId` hoặc `path` không tồn tại.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server hoặc từ dịch vụ backend.


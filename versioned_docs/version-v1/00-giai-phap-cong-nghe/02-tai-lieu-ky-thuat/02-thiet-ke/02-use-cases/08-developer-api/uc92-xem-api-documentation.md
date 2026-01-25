
# UC92: Xem API documentation

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer truy cập và xem tài liệu API chi tiết cho các dịch vụ. Tài liệu này cung cấp thông tin cần thiết để tích hợp các dịch vụ vào ứng dụng của họ, bao gồm các endpoint, phương thức HTTP, tham số, ví dụ request/response, và mã lỗi.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.
- Dịch vụ với ID được cung cấp phải tồn tại và có tài liệu API.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/services/{serviceId}/api-documentation`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần xem tài liệu API.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Truy vấn cơ sở dữ liệu hoặc hệ thống lưu trữ tài liệu để lấy nội dung tài liệu API của dịch vụ theo `serviceId`.
- Trả về nội dung tài liệu API (có thể ở định dạng Markdown, OpenAPI/Swagger JSON, hoặc HTML).
- Ghi log hoạt động truy cập tài liệu API.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa nội dung tài liệu API của dịch vụ. Định dạng nội dung có thể thay đổi tùy thuộc vào cách lưu trữ tài liệu.

```json
{
  "serviceId": "uuid-cua-service-1",
  "serviceName": "Speech To Text",
  "apiDocumentation": "# OpenAPI Specification for Speech To Text API\n\nopenapi: 3.0.0\ninfo:\n  title: Speech To Text API\n  version: 1.0.0\npaths:\n  /convert:\n    post:\n      summary: Convert audio to text\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              type: object\n              properties:\n                audioBase64:\n                  type: string\n                  description: Base64 encoded audio data\n                language:\n                  type: string\n                  description: Language code (e.g., en-US, vi-VN)\n      responses:\n        '200':\n          description: Successful conversion\n          content:\n            application/json:\n              schema:\n                type: object\n                properties:\n                  text:\n                    type: string\n                    description: Converted text\n        '400':\n          description: Invalid input\n"
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ hoặc tài liệu API cho `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


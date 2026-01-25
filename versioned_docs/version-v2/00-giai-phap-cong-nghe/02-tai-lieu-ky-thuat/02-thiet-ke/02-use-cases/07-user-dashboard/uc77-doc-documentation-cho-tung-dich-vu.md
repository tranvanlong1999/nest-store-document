
# UC77: Đọc documentation cho từng dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập truy cập và đọc tài liệu hướng dẫn sử dụng (documentation) cho từng dịch vụ cụ thể mà hệ thống cung cấp. Tài liệu này cung cấp thông tin chi tiết về cách sử dụng API của dịch vụ, các tham số đầu vào, định dạng đầu ra, ví dụ code, và các thông tin kỹ thuật khác.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Dịch vụ với ID được cung cấp phải tồn tại và có tài liệu hướng dẫn.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/services/{serviceId}/documentation`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần xem tài liệu.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu hoặc hệ thống lưu trữ tài liệu để lấy nội dung documentation của dịch vụ theo `serviceId`.
- Trả về nội dung tài liệu (có thể ở định dạng Markdown, HTML, hoặc JSON).
- Ghi log hoạt động truy cập tài liệu.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa nội dung tài liệu của dịch vụ. Định dạng nội dung có thể thay đổi tùy thuộc vào cách lưu trữ tài liệu.

```json
{
  "serviceId": "uuid-cua-service-1",
  "serviceName": "Speech To Text",
  "documentation": "# Speech To Text API Documentation\n\n## Endpoint\n`POST /stt/v1/convert`\n\n## Request Body\n```json\n{\n  \"audioBase64\": \"<base64_encoded_audio>\",\n  \"language\": \"vi-VN\"\n}\n```\n\n## Response Body\n```json\n{\n  \"text\": \"Đây là văn bản được chuyển đổi từ giọng nói.\"\n}\n```\n\n## Error Codes\n...\n"
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ hoặc tài liệu cho `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


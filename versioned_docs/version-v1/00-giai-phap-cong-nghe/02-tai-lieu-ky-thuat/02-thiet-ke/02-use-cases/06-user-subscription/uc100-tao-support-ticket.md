
# UC100: Tạo support ticket

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) tạo một yêu cầu hỗ trợ (support ticket) để báo cáo sự cố, đặt câu hỏi, hoặc yêu cầu trợ giúp từ đội ngũ hỗ trợ kỹ thuật. Điều này cung cấp một kênh chính thức để người dùng nhận được sự hỗ trợ cần thiết.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống hỗ trợ (ví dụ: Zendesk, Freshdesk) phải được tích hợp và có khả năng nhận ticket.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/support/tickets`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "subject": "Lỗi tích hợp API Speech To Text",
  "description": "Tôi đang gặp lỗi 500 khi gọi API Speech To Text với file audio định dạng MP3. Đã thử với nhiều file khác nhau nhưng vẫn lỗi. Request ID: req-12345.",
  "priority": "HIGH", // LOW, MEDIUM, HIGH, URGENT
  "attachments": [
    "base64_encoded_image_of_error_screenshot",
    "url_to_log_file"
  ]
}
```

- **Constraints**: 
    - `subject` và `description` là bắt buộc và không được rỗng.
    - `priority` là bắt buộc và phải là một trong các giá trị hợp lệ.
    - `attachments` là tùy chọn, có thể là base64 của hình ảnh hoặc URL đến các tệp log.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Tạo một support ticket mới trong hệ thống hỗ trợ (thông qua API của hệ thống hỗ trợ).
- Gán ticket cho người dùng hiện tại và thiết lập trạng thái ban đầu (ví dụ: `OPEN`).
- Ghi log hoạt động tạo ticket.
- (Tùy chọn) Gửi email xác nhận tạo ticket cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu ticket được tạo thành công.
- **Body**: Một đối tượng JSON xác nhận ticket đã được tạo:

```json
{
  "ticketId": "ticket_uuid_123",
  "status": "OPEN",
  "message": "Your support ticket has been created successfully. We will get back to you shortly."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống hỗ trợ).


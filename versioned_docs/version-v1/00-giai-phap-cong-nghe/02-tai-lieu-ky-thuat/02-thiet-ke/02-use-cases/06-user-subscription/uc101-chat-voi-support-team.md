
# UC101: Chat với support team

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) trò chuyện trực tiếp với đội ngũ hỗ trợ kỹ thuật thông qua một giao diện chat tích hợp. Điều này cung cấp một kênh giao tiếp nhanh chóng và hiệu quả để giải quyết các vấn đề khẩn cấp hoặc nhận được hỗ trợ theo thời gian thực.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống chat trực tuyến (ví dụ: Intercom, LiveChat) phải được tích hợp và hoạt động.

## 3. Định nghĩa Endpoint

Chức năng này thường được cung cấp thông qua một SDK hoặc widget của bên thứ ba được nhúng vào giao diện người dùng của hệ thống. Các tương tác chat diễn ra trực tiếp giữa client của người dùng và dịch vụ chat của bên thứ ba. Tuy nhiên, có thể có các endpoint backend để khởi tạo phiên chat hoặc lấy lịch sử chat.

- **HTTP Method**: `POST`
- **URL**: `/api/v1/support/chat/start` (để khởi tạo phiên chat)
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "topic": "Vấn đề kỹ thuật API",
  "initialMessage": "Tôi cần hỗ trợ về việc tích hợp API Speech To Text."
}
```

- **Constraints**: 
    - `topic` và `initialMessage` là tùy chọn, nhưng giúp đội hỗ trợ hiểu rõ hơn về vấn đề.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Gửi yêu cầu đến dịch vụ chat của bên thứ ba để khởi tạo một phiên chat mới.
- Dịch vụ chat của bên thứ ba sẽ tạo một phiên chat và trả về thông tin cần thiết để client của người dùng kết nối (ví dụ: session ID, token).
- Ghi log hoạt động khởi tạo chat.
- Các tin nhắn chat sau đó sẽ được xử lý trực tiếp bởi dịch vụ chat của bên thứ ba.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu phiên chat được khởi tạo thành công.
- **Body**: Một đối tượng JSON chứa thông tin để client kết nối đến phiên chat:

```json
{
  "chatSessionId": "chat_uuid_123",
  "chatUrl": "https://chat.example.com/session/uuid-cua-chat",
  "message": "Chat session started. Please open the chat window."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với dịch vụ chat).


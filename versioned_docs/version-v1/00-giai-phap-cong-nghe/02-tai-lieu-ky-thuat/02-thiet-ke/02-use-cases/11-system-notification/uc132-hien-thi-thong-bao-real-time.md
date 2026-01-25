
# UC132: Hiển thị thông báo real-time

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách hệ thống hiển thị các thông báo (notifications) theo thời gian thực trong ứng dụng (in-app notifications) cho người dùng. Các thông báo này có thể bao gồm cảnh báo quota, xác nhận giao dịch, cập nhật dịch vụ, hoặc các tin nhắn quan trọng khác, giúp người dùng luôn được cập nhật thông tin mà không cần làm mới trang.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập và sử dụng ứng dụng web/mobile.
- Hệ thống phải có cơ chế gửi thông báo real-time (ví dụ: WebSockets, Server-Sent Events).
- `Notification System` đã nhận được yêu cầu gửi thông báo in-app từ các microservice khác.

## 3. Định nghĩa Endpoint

Chức năng này thường được triển khai thông qua một kết nối WebSocket hoặc Server-Sent Events (SSE) giữa client (trình duyệt/ứng dụng di động) và `Notification System` hoặc một `WebSocket Gateway`.

- **WebSocket Endpoint**: `wss://yourdomain.com/ws/notifications`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng để thiết lập kết nối WebSocket.

## 4. Yêu cầu đầu vào

- **Client (qua WebSocket)**:
    - Sau khi kết nối, client có thể gửi một tin nhắn để xác thực hoặc yêu cầu lịch sử thông báo.

```json
{
  "type": "AUTHENTICATE",
  "token": "your_jwt_token"
}
```

## 5. Hậu xử lý

- **Thiết lập kết nối WebSocket**: 
    - Client mở kết nối WebSocket đến endpoint của `Notification System`.
    - `Notification System` xác thực JWT Token của người dùng.
    - Nếu xác thực thành công, duy trì kết nối và liên kết với `userId`.
- **Gửi thông báo real-time**: 
    - Khi có một sự kiện mới cần thông báo in-app (ví dụ: từ `Usage & Quota Service` gửi cảnh báo quota), `Notification System` sẽ:
        - Tạo một payload thông báo (JSON).
        - Gửi payload này qua kết nối WebSocket đến client của người dùng tương ứng.
- **Client xử lý**: 
    - Client nhận payload thông báo qua WebSocket.
    - Hiển thị thông báo trên giao diện người dùng (ví dụ: popup, toast, cập nhật biểu tượng chuông).
    - Ghi log hoạt động hiển thị thông báo.

## 6. Yêu cầu đầu ra

- **WebSocket Message (JSON)**:

```json
{
  "type": "NEW_NOTIFICATION",
  "notification": {
    "notificationId": "notif_uuid_new",
    "title": "Cảnh báo Quota: Speech To Text",
    "message": "Bạn đã sử dụng 90% quota Speech To Text của tháng này.",
    "type": "ACCOUNT",
    "status": "UNREAD",
    "createdAt": "2023-07-16T15:00:00Z"
  }
}
```

- **Trường hợp lỗi**: 
    - Nếu kết nối WebSocket bị đóng hoặc lỗi, client cần thử kết nối lại.
    - Lỗi xác thực sẽ dẫn đến việc từ chối kết nối WebSocket.


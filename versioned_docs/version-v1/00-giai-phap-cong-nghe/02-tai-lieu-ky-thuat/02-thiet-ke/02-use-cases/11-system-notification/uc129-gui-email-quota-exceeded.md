
# UC129: Gửi email quota exceeded

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email thông báo cho người dùng khi họ đã sử dụng hết hạn ngạch (quota) cho một dịch vụ cụ thể. Email này thông báo rằng dịch vụ có thể bị gián đoạn hoặc bị tính phí bổ sung nếu tiếp tục sử dụng, và khuyến nghị người dùng nâng cấp gói hoặc mua thêm quota.

## 2. Tiền xử lý

- `Usage & Quota Service` đã phát hiện người dùng đã vượt quá quota và gửi yêu cầu gửi email thông báo đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email thông báo vượt quota.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-quota-exceeded`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "serviceName": "Speech To Text",
  "limit": 100000,
  "unit": "seconds",
  "exceededBy": 5000 // Số lượng đã vượt quá
}
```

- **Constraints**: 
    - Tất cả các trường là bắt buộc.
    - `email` phải là định dạng email hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email thông báo vượt quota.
- Xác thực thông tin đầu vào.
- Sử dụng các thông tin được cung cấp để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi email thông báo vượt quota, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Quota exceeded email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


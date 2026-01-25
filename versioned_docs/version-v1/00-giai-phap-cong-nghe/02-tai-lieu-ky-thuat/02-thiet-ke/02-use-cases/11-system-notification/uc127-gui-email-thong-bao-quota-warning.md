
# UC127: Gửi email thông báo quota warning

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email cảnh báo cho người dùng khi mức độ sử dụng (usage) của họ cho một dịch vụ cụ thể gần đạt đến giới hạn (limit) đã được cấu hình. Email này thông báo cho người dùng về tình trạng sử dụng tài nguyên và khuyến nghị các hành động tiếp theo (ví dụ: nâng cấp gói).

## 2. Tiền xử lý

- `Usage & Quota Service` đã phát hiện người dùng gần hết quota và gửi yêu cầu gửi email cảnh báo đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email cảnh báo quota.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-quota-warning`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "serviceName": "Speech To Text",
  "currentUsage": 85000,
  "limit": 100000,
  "unit": "seconds",
  "threshold": 80 // Ngưỡng cảnh báo (ví dụ: 80%)
}
```

- **Constraints**: 
    - Tất cả các trường là bắt buộc.
    - `email` phải là định dạng email hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email cảnh báo quota.
- Xác thực thông tin đầu vào.
- Sử dụng các thông tin được cung cấp để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi email cảnh báo quota, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Quota warning email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


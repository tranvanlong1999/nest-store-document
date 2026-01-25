
# UC130: Gửi email service downtime

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email thông báo cho người dùng về tình trạng ngừng hoạt động (downtime) hoặc bảo trì theo lịch trình của một hoặc nhiều dịch vụ. Email này cung cấp thông tin về thời gian dự kiến ngừng hoạt động, lý do, và thời gian dịch vụ dự kiến sẽ hoạt động trở lại, giúp người dùng chủ động điều chỉnh kế hoạch sử dụng dịch vụ của họ.

## 2. Tiền xử lý

- `System Maintenance Service` hoặc `Monitoring System` đã phát hiện hoặc lên lịch ngừng hoạt động của dịch vụ và gửi yêu cầu gửi email thông báo đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email thông báo ngừng hoạt động dịch vụ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-service-downtime`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "serviceName": "Speech To Text",
  "startTime": "2023-07-20T02:00:00Z",
  "endTime": "2023-07-20T04:00:00Z",
  "reason": "Bảo trì hệ thống định kỳ để nâng cấp hiệu suất.",
  "impact": "Dịch vụ sẽ không khả dụng trong khoảng thời gian này.",
  "recipientType": "ALL_USERS" // ALL_USERS, AFFECTED_USERS, SPECIFIC_USERS
  // "userIds": ["uuid-user-1", "uuid-user-2"] // Nếu recipientType là SPECIFIC_USERS
}
```

- **Constraints**: 
    - `serviceName`, `startTime`, `endTime`, `reason`, `impact`, `recipientType` là bắt buộc.
    - `startTime` và `endTime` phải là định dạng ISO 8601 hợp lệ.
    - `recipientType` phải là một trong các giá trị hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email thông báo ngừng hoạt động dịch vụ.
- Xác thực thông tin đầu vào.
- Dựa trên `recipientType`, xác định danh sách email người nhận (ví dụ: truy vấn `User Service` để lấy tất cả email người dùng hoặc chỉ những người dùng bị ảnh hưởng).
- Sử dụng các thông tin được cung cấp để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi email thông báo ngừng hoạt động dịch vụ, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Service downtime notification email sent successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


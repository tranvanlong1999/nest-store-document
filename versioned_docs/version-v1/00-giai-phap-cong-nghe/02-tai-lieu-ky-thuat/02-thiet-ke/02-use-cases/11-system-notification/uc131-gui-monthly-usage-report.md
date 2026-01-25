
# UC131: Gửi monthly usage report

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi báo cáo sử dụng hàng tháng (monthly usage report) cho người dùng. Báo cáo này tổng hợp mức độ sử dụng của người dùng cho tất cả các dịch vụ trong tháng trước, cung cấp cái nhìn tổng quan về việc tiêu thụ tài nguyên và có thể bao gồm thông tin về chi phí.

## 2. Tiền xử lý

- `Reporting System` hoặc `Usage & Quota Service` đã tổng hợp dữ liệu usage hàng tháng cho người dùng và gửi yêu cầu gửi báo cáo đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email báo cáo sử dụng hàng tháng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-monthly-usage-report`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "reportPeriod": "2023-06", // Tháng/Năm của báo cáo
  "summary": {
    "totalRequests": 123456,
    "totalCost": 150.75,
    "currency": "USD"
  },
  "serviceDetails": [
    {
      "serviceName": "Speech To Text",
      "used": 85000,
      "unit": "seconds",
      "cost": 85.00
    },
    {
      "serviceName": "eKYC",
      "used": 1200,
      "unit": "transactions",
      "cost": 60.00
    }
  ],
  "reportLink": "https://yourdomain.com/reports/monthly/uuid-cua-report"
}
```

- **Constraints**: 
    - Tất cả các trường là bắt buộc.
    - `email` phải là định dạng email hợp lệ.
    - `reportLink` phải là một URL hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi báo cáo sử dụng hàng tháng.
- Xác thực thông tin đầu vào.
- Sử dụng các thông tin được cung cấp để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi báo cáo sử dụng hàng tháng, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Monthly usage report email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


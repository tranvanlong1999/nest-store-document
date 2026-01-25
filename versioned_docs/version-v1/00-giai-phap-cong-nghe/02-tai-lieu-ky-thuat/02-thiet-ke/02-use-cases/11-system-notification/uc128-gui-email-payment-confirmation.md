
# UC128: Gửi email payment confirmation

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Notification System` gửi email xác nhận thanh toán cho người dùng sau khi một giao dịch thanh toán thành công. Email này cung cấp chi tiết về giao dịch, bao gồm số tiền, dịch vụ/gói đã mua, ngày giao dịch, và thông tin hóa đơn, giúp người dùng có bằng chứng về việc thanh toán.

## 2. Tiền xử lý

- `Payment Service` đã xử lý thành công một giao dịch thanh toán và gửi yêu cầu gửi email xác nhận đến `Notification System`.
- `Notification System` đã được cấu hình với thông tin máy chủ email (SMTP) và mẫu email xác nhận thanh toán.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/notifications/email/send-payment-confirmation`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "email": "user@example.com",
  "transactionId": "txn_uuid_123",
  "amount": 99.99,
  "currency": "USD",
  "description": "Gói Premium hàng tháng",
  "transactionDate": "2023-07-16T10:00:00Z",
  "invoiceLink": "https://yourdomain.com/invoices/uuid-cua-invoice"
}
```

- **Constraints**: 
    - Tất cả các trường là bắt buộc.
    - `email` phải là định dạng email hợp lệ.
    - `invoiceLink` phải là một URL hợp lệ.

## 5. Hậu xử lý

- `Notification System` nhận yêu cầu gửi email xác nhận thanh toán.
- Xác thực thông tin đầu vào.
- Sử dụng các thông tin được cung cấp để tạo nội dung email dựa trên mẫu đã định nghĩa.
- Gửi email thông qua dịch vụ email.
- Ghi log hoạt động gửi email xác nhận thanh toán, bao gồm trạng thái gửi.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu gửi email được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "status": "ACCEPTED",
  "message": "Payment confirmation email sent successfully to user@example.com."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


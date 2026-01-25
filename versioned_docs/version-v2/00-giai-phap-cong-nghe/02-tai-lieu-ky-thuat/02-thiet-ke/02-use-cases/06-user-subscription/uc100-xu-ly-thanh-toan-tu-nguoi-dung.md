# UC100: Xử lý thanh toán từ người dùng

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Payment Service` xử lý yêu cầu thanh toán từ người dùng cuối (thông qua `User Service` hoặc `Subscription Service`). Nó bao gồm việc tương tác với các cổng thanh toán bên ngoài (Payment Gateway) để thực hiện giao dịch và cập nhật trạng thái thanh toán trong hệ thống.

## 2. Tiền xử lý

- Người dùng đã khởi tạo yêu cầu thanh toán thông qua giao diện người dùng.
- `User Service` hoặc `Subscription Service` đã gửi yêu cầu thanh toán đến `Payment Service` với các thông tin cần thiết.
- `Payment Service` đã được cấu hình với thông tin xác thực của các Payment Gateway (API keys, secrets).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/payments/process`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "userId": "uuid-cua-user",
  "amount": 99.99,
  "currency": "USD",
  "paymentMethodToken": "pm_card_visa_charge_success", // Token từ Payment Gateway (ví dụ: Stripe Token)
  "description": "Thanh toán gói Premium hàng tháng",
  "orderId": "uuid-cua-order-hoac-subscription"
}
```

- **Constraints**: 
    - `userId`, `amount`, `currency`, `paymentMethodToken`, `description`, `orderId` là bắt buộc.
    - `amount` phải là số dương.
    - `currency` phải là mã tiền tệ hợp lệ.

## 5. Hậu xử lý

- `Payment Service` nhận yêu cầu thanh toán.
- Xác thực thông tin đầu vào.
- Gửi yêu cầu thanh toán đến Payment Gateway tương ứng (ví dụ: Stripe API).
- Chờ phản hồi từ Payment Gateway.
- Dựa trên phản hồi:
    - Nếu thành công: Ghi lại giao dịch thanh toán với trạng thái `SUCCESS` vào cơ sở dữ liệu. Gửi sự kiện `PaymentProcessedEvent` đến Kafka (hoặc message broker khác) để `Subscription Service` cập nhật trạng thái gói dịch vụ của người dùng.
    - Nếu thất bại: Ghi lại giao dịch thanh toán với trạng thái `FAILED` vào cơ sở dữ liệu. Gửi sự kiện `PaymentFailedEvent` đến Kafka.
- Ghi log chi tiết quá trình xử lý thanh toán.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu được xử lý thành công (không nhất thiết là thanh toán thành công).
- **Body**: Một đối tượng JSON chứa thông tin giao dịch:

```json
{
  "transactionId": "txn_uuid_12345",
  "status": "PENDING", // Trạng thái ban đầu, sẽ được cập nhật bởi webhook hoặc polling
  "message": "Payment request submitted to gateway."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với Payment Gateway).


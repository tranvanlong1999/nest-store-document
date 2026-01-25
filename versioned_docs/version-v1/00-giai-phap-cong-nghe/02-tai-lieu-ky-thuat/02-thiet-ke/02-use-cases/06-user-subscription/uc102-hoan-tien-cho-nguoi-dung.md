
# UC102: Hoàn tiền cho người dùng

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Payment Service` xử lý yêu cầu hoàn tiền cho một giao dịch thanh toán đã thành công trước đó. Điều này bao gồm việc tương tác với Payment Gateway để thực hiện hoàn tiền và cập nhật trạng thái hoàn tiền trong hệ thống.

## 2. Tiền xử lý

- Có một giao dịch thanh toán đã thành công và đủ điều kiện để hoàn tiền.
- `Admin Service` hoặc `Customer Support Service` đã gửi yêu cầu hoàn tiền đến `Payment Service`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/internal/payments/refund`
- **Authentication**: Yêu cầu xác thực nội bộ (ví dụ: API Key hoặc JWT Token từ các microservice khác).

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "transactionId": "txn_uuid_12345", // ID của giao dịch gốc cần hoàn tiền
  "amount": 50.00, // Số tiền muốn hoàn tiền (tùy chọn, nếu không có sẽ hoàn toàn bộ)
  "reason": "Yêu cầu hủy dịch vụ"
}
```

- **Constraints**: 
    - `transactionId` là bắt buộc và phải là ID của một giao dịch đã thành công.
    - `amount` là tùy chọn, nếu có phải là số dương và không vượt quá số tiền gốc còn lại có thể hoàn tiền.
    - `reason` là bắt buộc.

## 5. Hậu xử lý

- `Payment Service` nhận yêu cầu hoàn tiền.
- Xác thực thông tin đầu vào và kiểm tra giao dịch gốc.
- Gửi yêu cầu hoàn tiền đến Payment Gateway tương ứng.
- Chờ phản hồi từ Payment Gateway.
- Dựa trên phản hồi:
    - Nếu thành công: Ghi lại giao dịch hoàn tiền với trạng thái `SUCCESS` vào cơ sở dữ liệu. Cập nhật trạng thái của giao dịch gốc (nếu hoàn toàn bộ). Gửi sự kiện `RefundProcessedEvent` đến Kafka.
    - Nếu thất bại: Ghi lại giao dịch hoàn tiền với trạng thái `FAILED` vào cơ sở dữ liệu. Gửi sự kiện `RefundFailedEvent` đến Kafka.
- Ghi log chi tiết quá trình xử lý hoàn tiền.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu được xử lý thành công (không nhất thiết là hoàn tiền thành công ngay lập tức).
- **Body**: Một đối tượng JSON chứa thông tin hoàn tiền:

```json
{
  "refundId": "ref_uuid_67890",
  "transactionId": "txn_uuid_12345",
  "status": "PENDING", // Trạng thái ban đầu, sẽ được cập nhật bởi webhook hoặc polling
  "message": "Refund request submitted to gateway."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `transactionId` không tồn tại, số tiền hoàn tiền không hợp lệ).
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với Payment Gateway).


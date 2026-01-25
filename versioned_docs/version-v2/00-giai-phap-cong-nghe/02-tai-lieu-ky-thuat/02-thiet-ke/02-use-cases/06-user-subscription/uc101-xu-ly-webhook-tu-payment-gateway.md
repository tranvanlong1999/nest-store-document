
# UC101: Xử lý webhook từ Payment Gateway

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách `Payment Service` nhận và xử lý các thông báo webhook từ các Payment Gateway (ví dụ: Stripe, Momo) về trạng thái của các giao dịch thanh toán. Webhook là cơ chế chính để Payment Service cập nhật trạng thái giao dịch một cách không đồng bộ và đáng tin cậy, đảm bảo hệ thống luôn có thông tin thanh toán mới nhất.

## 2. Tiền xử lý

- Payment Gateway đã được cấu hình để gửi webhook đến endpoint của `Payment Service`.
- `Payment Service` có khả năng xác minh chữ ký (signature) của webhook để đảm bảo tính toàn vẹn và nguồn gốc của dữ liệu.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/webhooks/payment-gateway/{gatewayName}` (ví dụ: `/webhooks/payment-gateway/stripe`)
- **Authentication**: Xác minh chữ ký webhook (không phải JWT Token).

## 4. Yêu cầu đầu vào

- **Headers**: 
    - `Stripe-Signature` (hoặc tương tự cho các gateway khác): Chữ ký của webhook để xác minh nguồn gốc.
- **Body (JSON)**: Payload của webhook từ Payment Gateway, chứa thông tin về sự kiện thanh toán (ví dụ: `payment_intent.succeeded`, `charge.failed`).

```json
{
  "id": "evt_12345",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_abcxyz",
      "amount": 9999,
      "currency": "usd",
      "status": "succeeded",
      "metadata": {
        "orderId": "uuid-cua-order-hoac-subscription",
        "userId": "uuid-cua-user"
      }
    }
  }
}
```

- **Constraints**: 
    - Payload phải là JSON hợp lệ.
    - Chữ ký webhook phải hợp lệ.

## 5. Hậu xử lý

- `Payment Service` nhận webhook.
- Xác minh chữ ký của webhook để đảm bảo tính xác thực.
- Phân tích loại sự kiện webhook (ví dụ: `payment_intent.succeeded`, `charge.failed`, `refund.succeeded`).
- Dựa trên loại sự kiện:
    - Cập nhật trạng thái của giao dịch thanh toán tương ứng trong cơ sở dữ liệu (ví dụ: từ `PENDING` sang `SUCCESS` hoặc `FAILED`).
    - Gửi sự kiện `PaymentSucceededEvent` hoặc `PaymentFailedEvent` đến Kafka (hoặc message broker khác) để các service liên quan (ví dụ: `Subscription Service`, `Usage Service`) có thể phản ứng.
- Trả về phản hồi `200 OK` cho Payment Gateway để xác nhận đã nhận webhook.
- Ghi log chi tiết quá trình xử lý webhook.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu webhook được xử lý thành công (ngay cả khi giao dịch thất bại, miễn là webhook được nhận và xử lý).
- **Body**: (Thường là rỗng hoặc một đối tượng JSON đơn giản để xác nhận)

```json
{
  "received": true
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu payload không hợp lệ hoặc chữ ký webhook không khớp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi cập nhật cơ sở dữ liệu hoặc gửi sự kiện).


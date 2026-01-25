
# UC64: Thanh toán gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập thực hiện thanh toán cho gói dịch vụ mà họ đã chọn hoặc đang sử dụng. Điều này bao gồm việc chọn phương thức thanh toán, nhập thông tin thanh toán, và hoàn tất giao dịch. Chức năng này áp dụng cho cả việc đăng ký gói mới và gia hạn gói hiện có.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã chọn một gói dịch vụ trả phí.
- Người dùng có phương thức thanh toán hợp lệ (ví dụ: thẻ tín dụng, ví điện tử).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/payments/process`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "planId": "uuid-cua-plan-premium",
  "paymentMethodId": "pm_card_visa", // ID phương thức thanh toán từ Payment Provider (ví dụ: Stripe Token ID)
  "billingCycle": "MONTHLY", // Chu kỳ thanh toán được chọn
  "couponCode": "DISCOUNT10" // Tùy chọn: Mã giảm giá
}
```

- **Constraints**: 
    - `planId` là bắt buộc, phải là ID của một gói dịch vụ trả phí hợp lệ.
    - `paymentMethodId` là bắt buộc, phải là ID hợp lệ từ Payment Provider.
    - `billingCycle` là bắt buộc, phải là một trong các giá trị hợp lệ (`MONTHLY`, `QUARTERLY`, `YEARLY`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra tính hợp lệ của `planId` và `billingCycle`.
- Tính toán tổng số tiền cần thanh toán, áp dụng mã giảm giá (nếu có).
- Gửi yêu cầu thanh toán đến `Payment Provider` (ví dụ: Stripe, Momo) với `paymentMethodId` và số tiền.
- Nếu thanh toán thành công:
    - Cập nhật trạng thái đăng ký gói dịch vụ của người dùng thành `ACTIVE`.
    - Ghi lại giao dịch thanh toán vào cơ sở dữ liệu.
    - Cập nhật hạn ngạch (quota) của người dùng theo gói mới.
    - Ghi log hoạt động thanh toán.
    - Gửi email xác nhận thanh toán và hóa đơn cho người dùng.
- Nếu thanh toán thất bại, trả về lỗi và thông báo cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thanh toán thành công.
- **Body**: Một đối tượng JSON xác nhận giao dịch thanh toán:

```json
{
  "transactionId": "txn_uuid_12345",
  "subscriptionId": "uuid-cua-subscription",
  "planName": "Premium",
  "amountPaid": 99.99,
  "currency": "USD",
  "status": "SUCCESS",
  "message": "Payment successful. Your Premium Plan is now active."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `planId` không hợp lệ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `402 Payment Required`: Nếu thanh toán thất bại (ví dụ: thẻ không đủ tiền, thông tin thẻ sai).
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với Payment Provider).


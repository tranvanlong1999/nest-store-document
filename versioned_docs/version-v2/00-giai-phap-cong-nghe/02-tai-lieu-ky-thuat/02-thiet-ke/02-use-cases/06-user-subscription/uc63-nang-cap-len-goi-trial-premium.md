
# UC63: Nâng cấp lên gói Trial/Premium

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập nâng cấp gói dịch vụ hiện tại của họ (ví dụ: từ Free lên Trial hoặc Premium). Quá trình nâng cấp bao gồm việc chọn gói mới, xác nhận các điều khoản, và thực hiện thanh toán (nếu là gói trả phí). Sau khi nâng cấp thành công, người dùng sẽ có quyền truy cập vào các tính năng và hạn ngạch của gói mới.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Gói dịch vụ mới phải tồn tại và có sẵn để nâng cấp.
- Người dùng phải có phương thức thanh toán hợp lệ (nếu là gói trả phí).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/subscriptions/upgrade`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "newPlanId": "uuid-cua-plan-premium",
  "paymentMethodId": "pm_card_visa" // ID phương thức thanh toán từ Stripe/Momo
}
```

- **Constraints**: 
    - `newPlanId` là bắt buộc, phải là ID của một gói dịch vụ hợp lệ và cao hơn gói hiện tại của người dùng.
    - `paymentMethodId` là bắt buộc nếu gói mới là gói trả phí.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra tính hợp lệ của `newPlanId` và đảm bảo người dùng có thể nâng cấp lên gói này.
- Nếu là gói trả phí:
    - Gửi yêu cầu thanh toán đến `Payment Provider` (ví dụ: Stripe, Momo) với `paymentMethodId` và giá của gói mới.
    - Nếu thanh toán thành công:
        - Cập nhật gói dịch vụ của người dùng trong cơ sở dữ liệu (thay đổi `planId`, `startDate`, `endDate`, `status`).
        - Cập nhật hạn ngạch (quota) của người dùng theo gói mới.
        - Ghi log hoạt động nâng cấp gói.
        - Gửi email xác nhận nâng cấp và hóa đơn cho người dùng.
- Nếu là gói Trial (miễn phí):
    - Cập nhật gói dịch vụ của người dùng trong cơ sở dữ liệu.
    - Cập nhật hạn ngạch (quota) của người dùng.
    - Ghi log hoạt động nâng cấp gói.
    - Gửi email xác nhận nâng cấp cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu nâng cấp thành công.
- **Body**: Một đối tượng JSON xác nhận việc nâng cấp gói:

```json
{
  "subscriptionId": "uuid-cua-subscription-moi",
  "userId": "uuid-cua-user",
  "planName": "Premium",
  "status": "ACTIVE",
  "startDate": "2023-07-16T08:00:00Z",
  "message": "Successfully upgraded to Premium Plan."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `newPlanId` không tồn tại, không thể nâng cấp lên gói này, thiếu phương thức thanh toán).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `402 Payment Required`: Nếu thanh toán thất bại.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


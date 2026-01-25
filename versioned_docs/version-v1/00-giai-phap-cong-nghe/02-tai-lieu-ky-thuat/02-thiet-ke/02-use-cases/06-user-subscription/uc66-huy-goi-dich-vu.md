
# UC66: Hủy gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập hủy gói dịch vụ trả phí hiện tại của họ. Khi hủy, gói dịch vụ sẽ không được gia hạn tự động vào chu kỳ tiếp theo, và người dùng sẽ tiếp tục sử dụng các tính năng của gói cho đến hết thời hạn đã thanh toán. Sau đó, tài khoản có thể được chuyển về gói Free hoặc bị vô hiệu hóa tùy theo chính sách.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải đang sử dụng một gói dịch vụ trả phí.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/subscriptions/cancel`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "reason": "Không còn nhu cầu sử dụng", // Tùy chọn: Lý do hủy
  "feedback": "Giao diện khó sử dụng." // Tùy chọn: Phản hồi
}
```

- **Constraints**: 
    - Không có ràng buộc bắt buộc, nhưng `reason` và `feedback` có thể được sử dụng để thu thập thông tin cải thiện dịch vụ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Cập nhật trạng thái đăng ký gói dịch vụ của người dùng thành `CANCELED` hoặc `PENDING_CANCELLATION`.
- Đảm bảo rằng gói dịch vụ sẽ không được gia hạn tự động.
- Ghi log hoạt động hủy gói dịch vụ.
- (Tùy chọn) Gửi email xác nhận hủy gói cho người dùng.
- (Tùy chọn) Thu thập lý do hủy và phản hồi để phân tích.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu hủy thành công.
- **Body**: Một đối tượng JSON xác nhận việc hủy gói:

```json
{
  "subscriptionId": "uuid-cua-subscription",
  "userId": "uuid-cua-user",
  "planName": "Premium",
  "status": "PENDING_CANCELLATION",
  "endDate": "2023-08-15T23:59:59Z", // Ngày gói dịch vụ hết hạn
  "message": "Your subscription has been successfully canceled. You can continue to use the service until the end of your current billing period."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu người dùng không có gói dịch vụ trả phí để hủy.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


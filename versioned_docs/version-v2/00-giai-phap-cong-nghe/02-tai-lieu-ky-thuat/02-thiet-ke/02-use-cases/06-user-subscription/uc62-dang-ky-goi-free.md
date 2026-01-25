
# UC62: Đăng ký gói Free

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập đăng ký gói dịch vụ miễn phí (Free Plan) của hệ thống. Gói Free thường đi kèm với các hạn chế về tính năng hoặc hạn ngạch sử dụng, nhưng không yêu cầu thanh toán.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng chưa đăng ký gói Free hoặc gói dịch vụ khác.
- Gói Free phải tồn tại và được kích hoạt trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/subscriptions/free`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào cụ thể trong body, vì gói Free đã được định nghĩa sẵn.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem người dùng đã có gói dịch vụ nào chưa.
- Nếu chưa có, tạo một đăng ký mới cho gói Free trong cơ sở dữ liệu, với trạng thái `ACTIVE` và ngày bắt đầu là hiện tại.
- Gán các hạn ngạch (quota) mặc định của gói Free cho người dùng.
- Ghi log hoạt động đăng ký gói Free.
- (Tùy chọn) Gửi email xác nhận đăng ký gói Free cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu đăng ký thành công.
- **Body**: Một đối tượng JSON xác nhận đăng ký gói Free:

```json
{
  "subscriptionId": "uuid-cua-subscription-moi",
  "userId": "uuid-cua-user",
  "planName": "Free",
  "status": "ACTIVE",
  "startDate": "2023-07-15T16:00:00Z",
  "message": "Successfully subscribed to Free Plan."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `400 Bad Request`: Nếu người dùng đã có gói dịch vụ khác hoặc gói Free không tồn tại/không khả dụng.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


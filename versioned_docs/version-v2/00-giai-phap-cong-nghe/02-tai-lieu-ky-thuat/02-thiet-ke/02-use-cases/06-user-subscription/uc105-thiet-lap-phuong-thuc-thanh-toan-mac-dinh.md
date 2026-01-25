
# UC105: Thiết lập phương thức thanh toán mặc định

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập chọn một trong các phương thức thanh toán đã lưu của họ làm phương thức mặc định. Phương thức mặc định sẽ được ưu tiên sử dụng cho các giao dịch tự động (ví dụ: gia hạn gói dịch vụ) hoặc được chọn sẵn khi người dùng thực hiện thanh toán thủ công.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có ít nhất một phương thức thanh toán đã được lưu.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/payment-methods/{paymentMethodId}/default`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `paymentMethodId` (String) - ID của phương thức thanh toán muốn đặt làm mặc định.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `paymentMethodId` có hợp lệ và thuộc về người dùng hiện tại không.
- Cập nhật trạng thái của phương thức thanh toán được chỉ định thành mặc định trong cơ sở dữ liệu.
- Đảm bảo rằng tất cả các phương thức thanh toán khác của người dùng đó không còn là mặc định.
- Ghi log hoạt động thiết lập phương thức thanh toán mặc định.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận phương thức thanh toán mặc định mới:

```json
{
  "paymentMethodId": "pm_uuid_123",
  "isDefault": true,
  "message": "Payment method set as default successfully."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu phương thức thanh toán không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy phương thức thanh toán với `paymentMethodId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


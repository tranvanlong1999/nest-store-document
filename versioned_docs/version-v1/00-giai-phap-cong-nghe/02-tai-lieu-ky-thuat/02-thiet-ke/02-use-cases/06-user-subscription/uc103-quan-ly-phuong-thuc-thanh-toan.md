
# UC103: Quản lý phương thức thanh toán

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng quản lý các phương thức thanh toán đã lưu của họ (ví dụ: thêm, xóa, cập nhật thẻ tín dụng/ghi nợ, ví điện tử). Điều này giúp người dùng dễ dàng thực hiện các giao dịch mà không cần nhập lại thông tin mỗi lần.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải tích hợp với Payment Gateway để lưu trữ và quản lý phương thức thanh toán một cách an toàn (PCI DSS compliant).

## 3. Định nghĩa Endpoint

### 3.1. Thêm phương thức thanh toán mới

- **HTTP Method**: `POST`
- **URL**: `/api/v1/payment-methods`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

### 3.2. Xem danh sách phương thức thanh toán

- **HTTP Method**: `GET`
- **URL**: `/api/v1/payment-methods`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

### 3.3. Xóa phương thức thanh toán

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/payment-methods/{paymentMethodId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

### 4.1. Thêm phương thức thanh toán mới

- **Body (JSON)**:

```json
{
  "paymentMethodToken": "tok_visa", // Token từ Payment Gateway (ví dụ: Stripe Token từ client-side)
  "type": "CARD", // CARD, E_WALLET, BANK_TRANSFER
  "isDefault": true // Tùy chọn: Đặt làm phương thức mặc định
}
```

- **Constraints**: 
    - `paymentMethodToken` là bắt buộc, được tạo từ client-side sau khi người dùng nhập thông tin thẻ.
    - `type` là bắt buộc.

### 4.2. Xem danh sách phương thức thanh toán

Không có tham số đầu vào.

### 4.3. Xóa phương thức thanh toán

- **Path Parameter**: `paymentMethodId` (String) - ID của phương thức thanh toán cần xóa.

## 5. Hậu xử lý

### 5.1. Thêm phương thức thanh toán mới

- Hệ thống xác thực JWT Token và xác định người dùng.
- Gửi `paymentMethodToken` đến Payment Gateway để tạo một phương thức thanh toán (Payment Method) được lưu trữ an toàn.
- Lưu ID của Payment Method từ Payment Gateway và các thông tin liên quan (ví dụ: 4 số cuối thẻ, loại thẻ) vào cơ sở dữ liệu của hệ thống.
- Nếu `isDefault` là true, đặt phương thức này làm mặc định và hủy đặt mặc định cho các phương thức khác.
- Ghi log hoạt động thêm phương thức thanh toán.

### 5.2. Xem danh sách phương thức thanh toán

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các phương thức thanh toán đã lưu của người dùng.
- Trả về danh sách.

### 5.3. Xóa phương thức thanh toán

- Hệ thống xác thực JWT Token và xác định người dùng.
- Gửi yêu cầu xóa phương thức thanh toán đến Payment Gateway.
- Xóa phương thức thanh toán khỏi cơ sở dữ liệu của hệ thống.
- Ghi log hoạt động xóa phương thức thanh toán.

## 6. Yêu cầu đầu ra

### 6.1. Thêm phương thức thanh toán mới

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin phương thức thanh toán mới:

```json
{
  "paymentMethodId": "pm_uuid_123",
  "type": "CARD",
  "last4": "4242",
  "brand": "Visa",
  "isDefault": true,
  "message": "Payment method added successfully."
}
```

### 6.2. Xem danh sách phương thức thanh toán

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các phương thức thanh toán:

```json
[
  {
    "paymentMethodId": "pm_uuid_123",
    "type": "CARD",
    "last4": "4242",
    "brand": "Visa",
    "isDefault": true
  },
  {
    "paymentMethodId": "pm_uuid_456",
    "type": "E_WALLET",
    "walletName": "Momo",
    "isDefault": false
  }
]
```

### 6.3. Xóa phương thức thanh toán

- **HTTP Status**: `204 No Content` nếu thành công.

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu phương thức thanh toán không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy phương thức thanh toán.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


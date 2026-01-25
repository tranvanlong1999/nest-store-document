
# UC65: Xem lịch sử thanh toán

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem lịch sử tất cả các giao dịch thanh toán của họ, bao gồm các khoản thanh toán cho gói dịch vụ, nâng cấp, hoặc các giao dịch khác. Lịch sử này cung cấp thông tin chi tiết về ngày, số tiền, trạng thái, và gói dịch vụ liên quan.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có ít nhất một giao dịch thanh toán đã được ghi nhận.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/payments/history`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc lịch sử (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc lịch sử (format: YYYY-MM-DD).
    - `status`: (String) Trạng thái giao dịch (ví dụ: `SUCCESS`, `FAILED`, `PENDING`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy các giao dịch thanh toán của người dùng.
- Áp dụng các bộ lọc và phân trang.
- Trả về danh sách các giao dịch thanh toán.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các giao dịch thanh toán và thông tin phân trang:

```json
{
  "content": [
    {
      "transactionId": "txn_uuid_1",
      "planName": "Premium",
      "amount": 99.99,
      "currency": "USD",
      "status": "SUCCESS",
      "transactionDate": "2023-06-15T10:00:00Z",
      "paymentMethod": "Credit Card"
    },
    {
      "transactionId": "txn_uuid_2",
      "planName": "Premium",
      "amount": 99.99,
      "currency": "USD",
      "status": "SUCCESS",
      "transactionDate": "2023-07-15T10:00:00Z",
      "paymentMethod": "Credit Card"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 5,
  "totalPages": 1
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


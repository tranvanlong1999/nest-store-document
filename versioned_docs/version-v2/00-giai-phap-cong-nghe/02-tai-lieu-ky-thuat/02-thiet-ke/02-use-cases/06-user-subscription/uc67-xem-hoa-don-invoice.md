
# UC67: Xem hóa đơn (Invoice)

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem chi tiết các hóa đơn (invoice) liên quan đến các giao dịch thanh toán của họ. Mỗi hóa đơn sẽ cung cấp thông tin đầy đủ về các khoản phí, dịch vụ đã sử dụng, ngày phát hành, và trạng thái thanh toán. Điều này giúp người dùng theo dõi các khoản chi tiêu và lưu trữ hồ sơ tài chính.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có ít nhất một hóa đơn đã được phát hành.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/invoices`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc hóa đơn (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc hóa đơn (format: YYYY-MM-DD).
    - `status`: (String) Trạng thái hóa đơn (ví dụ: `PAID`, `UNPAID`, `DUE`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các hóa đơn của người dùng.
- Áp dụng các bộ lọc và phân trang.
- Trả về danh sách các hóa đơn.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các hóa đơn và thông tin phân trang:

```json
{
  "content": [
    {
      "invoiceId": "inv_uuid_1",
      "invoiceNumber": "INV-2023-0001",
      "issueDate": "2023-06-15T00:00:00Z",
      "dueDate": "2023-06-30T00:00:00Z",
      "totalAmount": 99.99,
      "currency": "USD",
      "status": "PAID",
      "planName": "Premium Monthly",
      "periodStart": "2023-06-01T00:00:00Z",
      "periodEnd": "2023-06-30T23:59:59Z"
    },
    {
      "invoiceId": "inv_uuid_2",
      "invoiceNumber": "INV-2023-0002",
      "issueDate": "2023-07-15T00:00:00Z",
      "dueDate": "2023-07-30T00:00:00Z",
      "totalAmount": 99.99,
      "currency": "USD",
      "status": "PAID",
      "planName": "Premium Monthly",
      "periodStart": "2023-07-01T00:00:00Z",
      "periodEnd": "2023-07-31T23:59:59Z"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 2,
  "totalPages": 1
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


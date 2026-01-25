
# UC104: Xem lịch sử hoàn tiền

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng xem lịch sử các giao dịch hoàn tiền đã được thực hiện trên tài khoản của họ. Điều này cung cấp sự minh bạch về các khoản tiền đã được trả lại và giúp người dùng theo dõi tình hình tài chính của mình.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Phải có các giao dịch hoàn tiền đã được ghi nhận trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/refunds/history`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc lịch sử (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc lịch sử (format: YYYY-MM-DD).
    - `status`: (String) Trạng thái hoàn tiền (ví dụ: `SUCCESS`, `FAILED`, `PENDING`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy các giao dịch hoàn tiền liên quan đến người dùng.
- Áp dụng các bộ lọc và phân trang.
- Trả về danh sách các giao dịch hoàn tiền.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các giao dịch hoàn tiền và thông tin phân trang:

```json
{
  "content": [
    {
      "refundId": "ref_uuid_1",
      "transactionId": "txn_uuid_abc",
      "amount": 50.00,
      "currency": "USD",
      "status": "SUCCESS",
      "refundDate": "2023-07-10T15:00:00Z",
      "reason": "Hủy dịch vụ"
    },
    {
      "refundId": "ref_uuid_2",
      "transactionId": "txn_uuid_def",
      "amount": 25.00,
      "currency": "USD",
      "status": "PENDING",
      "refundDate": "2023-07-12T11:00:00Z",
      "reason": "Điều chỉnh hóa đơn"
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


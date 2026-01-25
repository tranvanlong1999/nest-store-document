
# UC71: Xem thông báo hệ thống

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem các thông báo từ hệ thống, bao gồm thông báo về cập nhật dịch vụ, bảo trì, thay đổi chính sách, hoặc các thông báo cá nhân liên quan đến tài khoản của họ (ví dụ: cảnh báo quota, xác nhận thanh toán). Điều này giúp người dùng luôn được cập nhật thông tin quan trọng từ hệ thống.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có các thông báo được tạo và gửi đến người dùng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/notifications`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `status`: (String) Trạng thái thông báo (`READ`, `UNREAD`).
    - `type`: (String) Loại thông báo (ví dụ: `SYSTEM`, `ACCOUNT`, `BILLING`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các thông báo của người dùng.
- Áp dụng các bộ lọc và phân trang.
- Trả về danh sách các thông báo.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các thông báo và thông tin phân trang:

```json
{
  "content": [
    {
      "notificationId": "notif_uuid_1",
      "title": "Cập nhật dịch vụ Speech To Text",
      "message": "Chúng tôi đã triển khai phiên bản mới của dịch vụ Speech To Text với hiệu suất được cải thiện.",
      "type": "SYSTEM",
      "status": "UNREAD",
      "createdAt": "2023-07-14T09:00:00Z"
    },
    {
      "notificationId": "notif_uuid_2",
      "title": "Cảnh báo Quota: eKYC",
      "message": "Bạn đã sử dụng 80% quota eKYC của tháng này. Vui lòng xem xét nâng cấp gói.",
      "type": "ACCOUNT",
      "status": "UNREAD",
      "createdAt": "2023-07-15T14:30:00Z"
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


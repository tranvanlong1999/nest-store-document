
# UC28: Gửi email thông báo kết quả duyệt

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép hệ thống tự động hoặc Admin thủ công gửi email thông báo kết quả duyệt yêu cầu đăng ký (phê duyệt hoặc từ chối) đến người dùng. Email này cung cấp thông tin rõ ràng về trạng thái yêu cầu và các bước tiếp theo (nếu có).

## 2. Tiền xử lý

- Yêu cầu đăng ký đã được duyệt (APPROVED hoặc REJECTED).
- Hệ thống email gửi đi phải hoạt động bình thường.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/registration-requests/{requestId}/send-notification-email`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `requestId` (UUID) - ID của yêu cầu đăng ký đã được duyệt.
- **Body (JSON)**:

```json
{
  "subject": "Kết quả duyệt yêu cầu đăng ký tài khoản của bạn",
  "message": "Tài khoản của bạn đã được phê duyệt. Bạn có thể đăng nhập ngay bây giờ."
}
```

- **Constraints**: 
    - `requestId` phải là một yêu cầu đã được duyệt (`APPROVED` hoặc `REJECTED`).
    - `subject` và `message` là tùy chọn, nếu không cung cấp, hệ thống sẽ sử dụng template mặc định.

## 5. Hậu xử lý

- Hệ thống xác định yêu cầu đăng ký theo `requestId`.
- Lấy thông tin email của người dùng liên quan và trạng thái duyệt.
- Chuẩn bị nội dung email dựa trên trạng thái duyệt và các template có sẵn (hoặc nội dung tùy chỉnh).
- Gửi email thông qua `Notification System`.
- Ghi log hoạt động gửi email.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu email được gửi thành công.
- **Body**: Một đối tượng JSON xác nhận việc gửi email:

```json
{
  "requestId": "uuid-cua-request",
  "email": "user@example.com",
  "status": "SENT",
  "message": "Notification email sent successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `requestId` không hợp lệ hoặc yêu cầu chưa được duyệt.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy yêu cầu đăng ký với `requestId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với Notification System).


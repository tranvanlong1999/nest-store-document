
# UC73: Yêu cầu tăng quota đặc biệt

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập gửi yêu cầu tăng hạn ngạch (quota) sử dụng cho một dịch vụ cụ thể, vượt quá giới hạn của gói dịch vụ hiện tại. Điều này thường áp dụng cho các trường hợp người dùng có nhu cầu sử dụng đột xuất hoặc dự án đặc biệt cần nhiều tài nguyên hơn.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải đang sử dụng một gói dịch vụ có giới hạn quota.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/users/quota-requests`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "serviceId": "uuid-cua-service-stt",
  "requestedLimit": 200000, // Hạn mức mong muốn
  "unit": "seconds",
  "reason": "Chúng tôi đang phát triển một dự án mới cần xử lý lượng lớn dữ liệu giọng nói trong tháng này."
}
```

- **Constraints**: 
    - `serviceId` là bắt buộc và phải là ID của một dịch vụ hợp lệ.
    - `requestedLimit` là bắt buộc và phải là số nguyên dương, lớn hơn hạn mức hiện tại của người dùng cho dịch vụ đó.
    - `unit` là bắt buộc và phải khớp với đơn vị của dịch vụ.
    - `reason` là bắt buộc, mô tả rõ ràng lý do yêu cầu tăng quota.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra tính hợp lệ của `serviceId`, `requestedLimit`, và `unit`.
- Tạo một bản ghi yêu cầu tăng quota mới trong cơ sở dữ liệu với trạng thái `PENDING`.
- Gửi thông báo đến Admin để xem xét yêu cầu.
- Ghi log hoạt động gửi yêu cầu tăng quota của người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu yêu cầu được gửi thành công.
- **Body**: Một đối tượng JSON xác nhận yêu cầu đã được tạo:

```json
{
  "requestId": "uuid-cua-quota-request",
  "userId": "uuid-cua-user",
  "serviceId": "uuid-cua-service-stt",
  "requestedLimit": 200000,
  "unit": "seconds",
  "status": "PENDING",
  "message": "Your quota increase request has been submitted and is awaiting review."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `requestedLimit` nhỏ hơn hoặc bằng hạn mức hiện tại, thiếu lý do).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


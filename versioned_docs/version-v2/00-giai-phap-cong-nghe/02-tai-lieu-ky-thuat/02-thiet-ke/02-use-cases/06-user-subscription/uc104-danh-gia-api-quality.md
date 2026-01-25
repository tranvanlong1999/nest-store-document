
# UC104: Đánh giá API quality

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) cung cấp phản hồi và đánh giá chất lượng của các API và dịch vụ của hệ thống. Điều này bao gồm việc đánh giá về độ tin cậy, hiệu suất, dễ sử dụng, và chất lượng tài liệu. Phản hồi này rất quan trọng để đội ngũ phát triển có thể cải thiện sản phẩm và dịch vụ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã có kinh nghiệm sử dụng API hoặc dịch vụ cần đánh giá.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/developer/api-feedback`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "serviceId": "uuid-cua-service-stt", // Tùy chọn: ID của dịch vụ được đánh giá
  "rating": 4, // Điểm đánh giá (ví dụ: 1-5 sao)
  "feedback": "API Speech To Text hoạt động rất tốt, nhưng tài liệu cần thêm ví dụ cho các ngôn ngữ khác.",
  "category": "API_QUALITY" // API_QUALITY, DOCUMENTATION, PERFORMANCE, RELIABILITY
}
```

- **Constraints**: 
    - `rating` là bắt buộc và phải là số nguyên trong khoảng cho phép (ví dụ: 1 đến 5).
    - `feedback` là bắt buộc và không được rỗng.
    - `category` là bắt buộc và phải là một trong các giá trị hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Lưu phản hồi và đánh giá vào cơ sở dữ liệu.
- (Tùy chọn) Gửi thông báo đến đội ngũ phát triển về phản hồi mới.
- Ghi log hoạt động đánh giá API.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu phản hồi được gửi thành công.
- **Body**: Một đối tượng JSON xác nhận phản hồi đã được ghi nhận:

```json
{
  "feedbackId": "feedback_uuid_123",
  "message": "Thank you for your feedback! We appreciate your input."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


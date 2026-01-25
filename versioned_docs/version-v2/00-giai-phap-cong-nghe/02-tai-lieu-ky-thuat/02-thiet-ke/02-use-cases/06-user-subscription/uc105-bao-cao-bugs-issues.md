
# UC105: Báo cáo bugs/issues

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) báo cáo các lỗi (bugs) hoặc vấn đề (issues) mà họ gặp phải khi sử dụng hệ thống, API, hoặc SDK. Việc báo cáo lỗi chi tiết giúp đội ngũ phát triển nhanh chóng xác định, tái tạo và khắc phục sự cố, đảm bảo chất lượng và độ ổn định của sản phẩm.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã gặp phải một lỗi hoặc vấn đề cần báo cáo.
- Hệ thống quản lý lỗi (ví dụ: Jira, GitHub Issues) phải được tích hợp và có khả năng nhận báo cáo.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/developer/bug-reports`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "title": "Lỗi 500 khi gọi API eKYC Face Matching",
  "description": "Khi tôi gọi API /ekyc/face-matching với hai ảnh A và B, thỉnh thoảng nhận được lỗi 500 Internal Server Error. Lỗi này không xảy ra liên tục, rất khó tái tạo. Request ID gần nhất: req-xyz789. Đã thử với các cặp ảnh khác nhau, lỗi vẫn xuất hiện ngẫu nhiên.",
  "severity": "HIGH", // LOW, MEDIUM, HIGH, CRITICAL
  "stepsToReproduce": [
    "1. Gọi API /ekyc/face-matching với ảnh A và B.",
    "2. Quan sát lỗi 500.",
    "3. Thử lại nhiều lần để thấy lỗi xuất hiện ngẫu nhiên."
  ],
  "expectedResult": "API trả về kết quả so khớp khuôn mặt thành công (200 OK) hoặc lỗi nghiệp vụ rõ ràng (4xx).",
  "actualResult": "API trả về lỗi 500 Internal Server Error.",
  "environment": "Production", // Development, Staging, Production
  "attachments": [
    "base64_encoded_screenshot_of_error",
    "url_to_relevant_logs"
  ]
}
```

- **Constraints**: 
    - `title`, `description`, `severity`, `stepsToReproduce`, `expectedResult`, `actualResult` là bắt buộc và không được rỗng.
    - `severity` và `environment` phải là một trong các giá trị hợp lệ.
    - `stepsToReproduce` phải là một mảng các bước rõ ràng.
    - `attachments` là tùy chọn, có thể là base64 của hình ảnh hoặc URL đến các tệp log.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Tạo một báo cáo lỗi mới trong hệ thống quản lý lỗi (thông qua API của hệ thống quản lý lỗi).
- Gán báo cáo lỗi cho người dùng hiện tại và thiết lập trạng thái ban đầu (ví dụ: `NEW`, `OPEN`).
- Ghi log hoạt động báo cáo lỗi.
- (Tùy chọn) Gửi email xác nhận báo cáo lỗi cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu báo cáo lỗi được tạo thành công.
- **Body**: Một đối tượng JSON xác nhận báo cáo lỗi đã được tạo:

```json
{
  "bugReportId": "bug_uuid_123",
  "status": "NEW",
  "message": "Your bug report has been submitted successfully. We will investigate it shortly."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống quản lý lỗi).


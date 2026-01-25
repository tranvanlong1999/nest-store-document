
# UC97: Xem API response logs

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) xem các bản ghi phản hồi (response logs) của các cuộc gọi API mà họ đã thực hiện. Điều này bao gồm thông tin về trạng thái phản hồi, headers, và nội dung phản hồi (body) từ các dịch vụ. Việc xem response logs giúp người dùng xác minh dữ liệu trả về, gỡ lỗi tích hợp, và đảm bảo các API hoạt động như mong đợi.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã thực hiện các cuộc gọi API.
- Hệ thống phải có cơ chế ghi lại và lưu trữ response logs cho từng cuộc gọi API.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-response-logs`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc logs theo dịch vụ cụ thể.
    - `apiKeyId`: (UUID) Lọc logs theo API key cụ thể.
    - `statusCode`: (Integer) Lọc logs theo mã trạng thái HTTP (ví dụ: 200, 400, 500).
    - `startDate`: (Date) Ngày bắt đầu để lọc logs (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc logs (format: YYYY-MM-DD).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn hệ thống logging để lấy các bản ghi response logs của người dùng, dựa trên các tham số lọc.
- Áp dụng phân trang và sắp xếp kết quả.
- Trả về danh sách các bản ghi response logs.
- Ghi log hoạt động xem response logs.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bản ghi response logs và thông tin phân trang:

```json
{
  "content": [
    {
      "logId": "res_log_uuid_1",
      "apiCallId": "uuid-cua-api-call-1",
      "timestamp": "2023-07-16T09:35:00Z",
      "serviceName": "Speech To Text",
      "statusCode": 200,
      "responseHeaders": {
        "Content-Type": "application/json",
        "X-Request-Id": "req-123"
      },
      "responseBodyPreview": "{\"text\":\"Hello world\"}", // Có thể bị cắt ngắn
      "durationMs": 120
    },
    {
      "logId": "res_log_uuid_2",
      "apiCallId": "uuid-cua-api-call-2",
      "timestamp": "2023-07-16T09:36:00Z",
      "serviceName": "eKYC",
      "statusCode": 400,
      "responseHeaders": {
        "Content-Type": "application/json"
      },
      "responseBodyPreview": "{\"errorCode\":\"INVALID_IMAGE\",\"message\":\"Image too blurry\"}",
      "durationMs": 250
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


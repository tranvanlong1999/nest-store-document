
# UC96: Debug API calls

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) gỡ lỗi (debug) các cuộc gọi API của họ. Điều này bao gồm việc cung cấp các công cụ và thông tin chi tiết để phân tích lỗi, hiểu nguyên nhân thất bại, và tối ưu hóa các yêu cầu API. Các công cụ debug có thể bao gồm log chi tiết, thông tin về request/response, và các gợi ý khắc phục.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã thực hiện các cuộc gọi API cần gỡ lỗi.
- Hệ thống phải có cơ chế ghi lại và truy vấn các log chi tiết của các cuộc gọi API.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-calls/{callId}/debug`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `callId` (UUID) - ID của cuộc gọi API cần gỡ lỗi.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `callId` có hợp lệ và cuộc gọi API đó thuộc về người dùng hiện tại không.
- Truy vấn hệ thống logging/monitoring để lấy thông tin chi tiết về cuộc gọi API, bao gồm:
    - Request headers và body.
    - Response headers và body.
    - Status code.
    - Thời gian thực hiện.
    - Bất kỳ lỗi hoặc ngoại lệ nào xảy ra ở backend.
    - Trace ID hoặc Correlation ID để theo dõi luồng xử lý qua các microservice.
- Tổng hợp thông tin và trả về cho người dùng.
- Ghi log hoạt động debug API calls.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin debug của cuộc gọi API:

```json
{
  "callId": "uuid-cua-api-call",
  "timestamp": "2023-07-16T09:30:00Z",
  "endpoint": "/api/v1/stt/recognize",
  "method": "POST",
  "statusCode": 400,
  "request": {
    "headers": {
      "Content-Type": "audio/wav",
      "Authorization": "Bearer sk_live_..."
    },
    "bodyPreview": "[Binary data - first 100 bytes]"
  },
  "response": {
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "errorCode": "INVALID_AUDIO_FORMAT",
      "message": "Unsupported audio format. Please use WAV or MP3."
    }
  },
  "durationMs": 50,
  "errorDetails": {
    "type": "ValidationException",
    "message": "Audio format check failed.",
    "stackTrace": "... (truncated) ..."
  },
  "traceId": "abc-123-xyz"
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu cuộc gọi API không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy cuộc gọi API với `callId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


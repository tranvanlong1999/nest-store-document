
# UC98: Monitor API performance

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) theo dõi hiệu suất (performance) của các cuộc gọi API mà họ đã thực hiện. Điều này bao gồm các chỉ số như thời gian phản hồi trung bình, tỷ lệ lỗi, số lượng yêu cầu mỗi giây (RPS), và các biểu đồ xu hướng. Việc giám sát hiệu suất giúp người dùng xác định các vấn đề về độ trễ, lỗi, hoặc tắc nghẽn trong quá trình tích hợp API của họ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng đã thực hiện các cuộc gọi API.
- Hệ thống phải có cơ chế thu thập và lưu trữ các chỉ số hiệu suất của các cuộc gọi API.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-performance`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc performance theo dịch vụ cụ thể.
    - `apiKeyId`: (UUID) Lọc performance theo API key cụ thể.
    - `startDate`: (Date) Ngày bắt đầu để lọc dữ liệu (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc dữ liệu (format: YYYY-MM-DD).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `HOURLY`, `DAILY`). Mặc định là `HOURLY`.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn hệ thống monitoring/metrics để lấy các chỉ số hiệu suất của người dùng, dựa trên các tham số lọc.
- Tổng hợp dữ liệu theo `interval` được yêu cầu.
- Trả về các chỉ số hiệu suất.
- Ghi log hoạt động xem performance API.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa các chỉ số hiệu suất API:

```json
{
  "metrics": [
    {
      "timestamp": "2023-07-16T09:00:00Z",
      "serviceName": "Speech To Text",
      "totalRequests": 1500,
      "averageResponseTimeMs": 120,
      "errorRate": 0.01, // 1%
      "rps": 0.41 // Requests per second
    },
    {
      "timestamp": "2023-07-16T10:00:00Z",
      "serviceName": "Speech To Text",
      "totalRequests": 1800,
      "averageResponseTimeMs": 115,
      "errorRate": 0.005,
      "rps": 0.5
    }
  ],
  "summary": {
    "totalRequests": 12345,
    "averageResponseTimeMs": 130,
    "totalErrors": 123,
    "overallErrorRate": 0.01
  }
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


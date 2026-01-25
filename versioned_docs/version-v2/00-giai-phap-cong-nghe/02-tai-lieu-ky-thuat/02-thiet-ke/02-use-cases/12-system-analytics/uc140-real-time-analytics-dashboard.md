
# UC140: Real-time analytics dashboard

## 1. Mô tả yêu cầu chức năng

Chức năng này cung cấp một bảng điều khiển (dashboard) hiển thị các chỉ số phân tích và dữ liệu quan trọng của hệ thống theo thời gian thực. Điều này giúp người dùng (Admin hoặc người dùng có quyền) có cái nhìn tổng quan và tức thì về hiệu suất hệ thống, xu hướng sử dụng, và các sự kiện quan trọng đang diễn ra.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền truy cập dashboard.
- Hệ thống phải có cơ chế thu thập, xử lý, và hiển thị dữ liệu theo thời gian thực (ví dụ: Kafka, Spark Streaming, WebSocket).

## 3. Định nghĩa Endpoint

Chức năng này thường được cung cấp thông qua một giao diện người dùng web (Frontend Application) tương tác với các API backend cung cấp dữ liệu real-time. Các API này thường sử dụng WebSockets hoặc Server-Sent Events để đẩy dữ liệu liên tục.

- **HTTP Method**: `GET`
- **URL**: `/api/v1/analytics/dashboard/realtime`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `metrics`: (String) Danh sách các chỉ số muốn hiển thị (ví dụ: `totalRequests`, `activeUsers`, `errorRate`).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `1_MINUTE`, `5_MINUTES`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn `Analytics Service` hoặc các hệ thống dữ liệu real-time để lấy các chỉ số được yêu cầu.
- Dữ liệu được tổng hợp và trả về cho frontend.
- Frontend hiển thị dữ liệu trên dashboard, cập nhật liên tục thông qua WebSocket hoặc SSE.
- Ghi log hoạt động xem dashboard.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa các chỉ số real-time:

```json
{
  "timestamp": "2023-07-16T10:30:00Z",
  "metrics": {
    "totalRequestsLastMinute": 1200,
    "activeUsers": 500,
    "errorRateLast5Minutes": 0.002,
    "cpuUsage": 0.75,
    "memoryUsage": 0.60
  },
  "serviceMetrics": [
    {
      "serviceName": "Speech To Text",
      "requestsLastMinute": 500,
      "avgResponseTimeMs": 80
    },
    {
      "serviceName": "eKYC",
      "requestsLastMinute": 300,
      "avgResponseTimeMs": 150
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu người dùng không có quyền truy cập dashboard.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.


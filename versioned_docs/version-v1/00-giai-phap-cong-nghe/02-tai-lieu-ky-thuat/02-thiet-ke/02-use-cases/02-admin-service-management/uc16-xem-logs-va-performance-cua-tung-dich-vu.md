
# UC16: Xem logs và performance của từng dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem các bản ghi (logs) và theo dõi hiệu suất (performance metrics) của từng dịch vụ cụ thể trong hệ thống. Điều này giúp Admin phát hiện sớm các vấn đề, gỡ lỗi, và đánh giá sức khỏe của các microservice.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng giám sát hệ thống.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.
- Hệ thống logging và monitoring phải được thiết lập và thu thập dữ liệu từ các dịch vụ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/services/{serviceId}/logs`
- **URL**: `/api/v1/admin/services/{serviceId}/performance`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần xem logs/performance.
- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc logs/metrics (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc logs/metrics (format: YYYY-MM-DD).
    - `logLevel`: (String) Mức độ log để lọc (ví dụ: `INFO`, `WARN`, `ERROR`).
    - `metricName`: (String) Tên của metric cần xem (ví dụ: `request_count`, `average_response_time`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn `Logging & Monitoring Service` (ví dụ: Elasticsearch cho logs, Prometheus cho metrics) để lấy dữ liệu liên quan đến `serviceId`.
- Áp dụng các bộ lọc và phân trang.
- Trả về dữ liệu logs hoặc performance metrics.
- Ghi log hoạt động truy cập giám sát của Admin.

## 6. Yêu cầu đầu ra

### 6.1. Xem Logs

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bản ghi log và thông tin phân trang:

```json
{
  "content": [
    {
      "timestamp": "2023-07-15T19:00:00Z",
      "serviceId": "uuid-cua-service",
      "logLevel": "INFO",
      "message": "Request processed successfully for user uuid-xyz",
      "traceId": "trace-id-123"
    },
    {
      "timestamp": "2023-07-15T18:55:00Z",
      "serviceId": "uuid-cua-service",
      "logLevel": "ERROR",
      "message": "Database connection failed: Connection refused",
      "traceId": "trace-id-456"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 1000,
  "totalPages": 50
}
```

### 6.2. Xem Performance Metrics

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các điểm dữ liệu metric:

```json
{
  "serviceId": "uuid-cua-service",
  "metricName": "average_response_time",
  "unit": "ms",
  "dataPoints": [
    {
      "timestamp": "2023-07-15T18:00:00Z",
      "value": 120
    },
    {
      "timestamp": "2023-07-15T18:05:00Z",
      "value": 150
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ với `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống logging/monitoring).



# UC41: Xem system logs và error logs

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) truy cập và xem các bản ghi hệ thống (system logs) và bản ghi lỗi (error logs) từ tất cả các thành phần của hệ thống. Điều này là cực kỳ quan trọng để gỡ lỗi, phân tích nguyên nhân gốc rễ của sự cố, theo dõi các hoạt động bất thường, và đảm bảo tuân thủ các quy định về kiểm toán.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập vào hệ thống logging.
- Hệ thống logging tập trung (ví dụ: ELK Stack, Grafana Loki) phải được thiết lập và thu thập logs từ tất cả các microservice và thành phần hạ tầng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/system/logs`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceName`: (String) Tên của microservice để lọc logs (ví dụ: `auth-service`, `payment-service`).
    - `logLevel`: (String) Mức độ log để lọc (ví dụ: `INFO`, `WARN`, `ERROR`, `DEBUG`).
    - `startDate`: (Date) Ngày bắt đầu để lọc logs (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc logs (format: YYYY-MM-DD).
    - `keyword`: (String) Từ khóa để tìm kiếm trong nội dung log.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).
    - `sortBy`: (String) Tên trường để sắp xếp (ví dụ: `timestamp`).
    - `sortOrder`: (String) Thứ tự sắp xếp (`ASC` hoặc `DESC`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn hệ thống logging tập trung (ví dụ: Elasticsearch) để lấy các bản ghi log dựa trên các tiêu chí lọc.
- Áp dụng phân trang và sắp xếp kết quả.
- Trả về danh sách các bản ghi log.
- Ghi log hoạt động truy cập logs của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bản ghi log và thông tin phân trang:

```json
{
  "content": [
    {
      "logId": "log-entry-1",
      "timestamp": "2023-07-16T01:00:00Z",
      "serviceName": "auth-service",
      "logLevel": "INFO",
      "message": "User 'user@example.com' logged in successfully.",
      "traceId": "abc-123",
      "spanId": "def-456"
    },
    {
      "logId": "log-entry-2",
      "timestamp": "2023-07-16T00:55:00Z",
      "serviceName": "payment-service",
      "logLevel": "ERROR",
      "message": "Failed to process payment for transaction 789: Insufficient funds.",
      "traceId": "ghi-789",
      "spanId": "jkl-012"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 5000,
  "totalPages": 250
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống logging).

